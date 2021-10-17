const Files = require("../database/models/Files");
const User = require("../database/models/User");
const path = require('path');
const fs = require('fs');


const uuid = require('uuid').v4


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

module.exports = {
    async index(req, res) {
        const data = await Files.findAll({include: [{
            model: User
        //
          }]});
        return res.json({status:true,data});
        
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
    async upload(req, res) {
        
        multerUpload.single('plugin')(req, res, async function (err) {
            if(!req.file){
                return res
                .status(400)
                .json({ error: "Error on upload plugin" });
            }
        
            const filename = req.file.filename
            const file = {
                filename: fileManager.getFileInfo(filename).name,
                type: fileManager.getFileInfo(filename).type,
                description: req.body.description,
                name: req.body.name,
                repo:req.body.repo,
                user_id: req.userId,
                url: fileManager.getFileUrl(filename)
            }
            //await ftpManager.upload(req.file.filename)
            console.log(`Uploading ${filename} to hostgator server..`)

           await Files.create(file)
           console.log(`trying to delete file ${filename} of tmp folder.`)
           fileManager.delFile(filename) 
           
            
        })
      //  await ftpManager.example()
        // add file and it's path to postgres database
        //   Files.create({filename,filepath:filePath,name:req.body.name})
       return res.json({status:true});
        
        
    }
    
}