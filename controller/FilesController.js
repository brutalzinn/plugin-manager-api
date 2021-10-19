const Files = require("../database/models/Files");
const User = require("../database/models/User");
const Version = require("../database/models/Version");

const path = require('path');
const fs = require('fs');
const es = require('../config/elasticsearch')
const randomHelper = require('../utils/seederHelper')
const uuid = require('uuid').v4
const versionManager = require("../service/versionManager")

const ftpManager = require("../service/ftpManager")
const fileManager = require("../service/fileManager")
const tmpDirectory = path.join(path.dirname(require.main.filename),'uploads')


const multer  = require('multer');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tmpDirectory)
  },
  filename: function (req, file, cb) {
    cb(null, uuid() + path.extname(file.originalname)) //Appending extension
  }
})

const multerUpload = multer({ storage: storage });

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  
  return { limit, offset };
};
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: files } = data;
  const currentPage = page ? +page : 1;
  const totalPages = Math.ceil(totalItems / limit);
  
  return { totalItems, files, totalPages, currentPage };
};

module.exports = {
  async index(req, res) {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);
    Files.findAndCountAll({ limit, offset,include: [{
      model: User,
      as: 'user'
    },
    {
      model: Version,
      as: 'version'
    }
  ] })
    .then(data => {
      const response = getPagingData(data, page, limit);
      res.send(response);
    })
    .catch(err => {
      res.status(500).send({
        message:
        err.message || "Some error occurred while retrieving tutorials."
      });
    });
    
    // const data = await Files.findAll({include: [{
    //   model: User,
    //   as: 'user'
    //   //
    // }]});
    //return res.json({status:true,data});
  },
  
  async search(req,res) {
    var searchParams  =[]
    searchParams = req.query.q.normalize('NFD').replace(/[\u0300-\u036f]/g, "").split(' ')
    
    searchParams =  searchParams.map((term)=> {
      return {
        regexp: {
          search: {
            value: term + '.*',
            flags: "ALL"
          }
        }
      }  
    })
    try{
      const result = await es.search({
        index: 'files',
        type: 'files',
        body: {  
          query: {
            bool: {
              filter: searchParams
            }}
          }
        })
        const ids = result.hits.hits.map((item) => {
          return item._id
        })
        const { page, size } = req.query;
        const { limit, offset } = getPagination(page, size);
        Files.findAndCountAll({ limit, offset, where: {
          id: ids
        },include: [{
          model: User,
          as: 'user'
        },
        {
          model: Version,
          as: 'version'
        }
      
      ] })
        .then(data => {
          const response = getPagingData(data, page, limit);
          res.send(response);
        })
        .catch(err => {
          res.status(500).send({
            message:
            err.message || "Some error occurred while retrieving tutorials."
          });
        }); 
      }
      catch(err){
        res.status(500).send({
          error: 'An error has occured trying to get the articles' + err
        })
      }
    },
    async delete(req, res) {
      fs.unlink(req.query.filepath, () => {
        Files.destroy({where:{filepath:req.query.filepath}})
        return res.json({status:true});
      });
    },
    async download(req, res) {
      return res.download(req.query.filepath);
    },
    async uploadTest (req,res ){
      
      
      const randomFile = randomHelper.randomFilesModel(1,req.body.name,req.userId)
      
      await Files.create(randomFile[0])
      return res.json({status:true});
      
    },
    async upload(req, res) {
      
      multerUpload.single('plugin')(req, res, async function (err) {
        if(!req.file){
          return res
          .status(400)
          .json({ error: "Error on upload plugin" });
        }
        let version = {
          sha:req.body.sha || '',
          crc:req.body.crc || '',
          file_version: req.body.version || '1.0.0.0' 
        }
        let file = {}
        let filename = req.file.filename
        versionManager.create(version).then((version_id)=>{
        
          file = {
           filename: fileManager.getFileInfo(filename).name,
           type: fileManager.getFileInfo(filename).type,
           description: req.body.description,
           name: req.body.name,
           version_id,
           repo:req.body.repo,
           user_id: req.userId,
           url: fileManager.getFileUrl(filename)
         }
         Files.create(file).finally((e)=>{
         // ftpManager.upload(req.file.filename).finally(()=>fileManager.delFile(filename))
         //fileManager.delFile(filename)
         })
        
        })
       
        //await ftpManager.upload(req.file.filename)
        console.log(`Uploading ${filename} to hostgator server..`)
        
    
        console.log(`trying to delete file ${filename} of tmp folder.`)
       
        
        
      })
      //  await ftpManager.example()
      // add file and it's path to postgres database
      //   Files.create({filename,filepath:filePath,name:req.body.name})
      return res.json({status:true});
      
      
    }
    
  }