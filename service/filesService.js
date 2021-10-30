require("dotenv").config();
const path = require('path');
const fs = require('fs');
const Files = require("../database/models/Files");
const User = require("../database/models/User");
const Version = require("../database/models/Version");
const versionManager = require("../service/versionService")

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
     getFileInfo (filename) {
          let data = filename.split(".")
          return {name:data[0],type:data[1]}
     },
     getFileUrl  (filename) { return `${process.env.URL}/${filename}`},
     delFile (filename) { return fs.unlinkSync(path.join(tmpDirectory,filename)) },
     
     
     async index(page, size) {
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
          return getPagingData(data, page, limit);
     }).catch(err => {
          return {
               message:
               err.message || "Aconteceu algum erro."
          }
     });
},
async ArquivosDeUsuario(page, size) {
     const { limit, offset } = getPagination(page, size);
     
     Files.findAndCountAll({ where:{user_id: req.userId}, limit, offset,include: [{
          model: User,
          as: 'user'
     },
     {
          model: Version,
          as: 'version'
     }
] })
.then(data => {
     return getPagingData(data, page, limit);
})
.catch(err => {
     return {
          message:
          err.message || "Aconteceu algum erro."
     }
});
},

async Busca(searchParams) {
     var searchParams  =[]
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
               return getPagingData(data, page, limit);
               
          })
          .catch(err => {
               return {
                    message:
                    err.message || "Some error occurred while retrieving tutorials."
               }
          }); 
     }
     catch(err){
          return {
               error: 'An error has occured trying to get the articles' + err
          }
     }
},
async DeletarArquivo(arquivo) {
     fs.unlink(arquivo, async () => {
          await Files.destroy({where:{filepath:arquivo}})
          return {status:true}
     });
},
async EnviarArquivo(userId,filename,body) {   
     let version = {
          sha:body.sha || '',
          crc:body.crc || '',
          unique_id:body.unique_id || '',
          file_version: body.version || '1.0.0.0' 
     }
     let checkVersion =  await versionManager.checkUniqueID(version.unique_id)  
     if(checkVersion){
          return { status:false,error: "Already has plugin with this version:" + version.unique_id };
     }
     let file = {}
     let version_id = await versionManager.create(version)
     file = {
          filename: this.getFileInfo(filename).name,
          type: this.getFileInfo(filename).type,
          description: body.description,
          name: body.name,
          version_id,
          repo:body.repo,
          user_id: userId,
          url: this.getFileUrl(filename)
     }
     await Files.create(file)
        
     return {status:true};
    
        //  versionManager.delete(version_id).finally(()=>console.log('deu erro no version.'))
 
     
     
     //await ftpManager.upload(req.file.filename)   
},
async AtualizarArquivo(userId,filename,body) {
     let version = {
          sha:body.sha || '',
          crc:body.crc || '',
          unique_id:req.params.versionid || '',
          file_version: body.version || '1.0.0.0' 
     }
     
     let file = {
          filename: this.getFileInfo(filename).name,
          type: this.getFileInfo(filename).type,
          description: body.description,
          name: body.name,
          repo:body.repo,
          url: this.getFileUrl(filename)
     }
     
     let user_id = userId
     
     const FilesModel = await Files.findOne({include: [
          {
               model: Version,
               as: 'version',
               where: {unique_id:version.unique_id}
          }],where:{user_id}});
          
          if (!FilesModel) {
               return { status:false, error: `Cant found file ${filename}` }
          }
          
          let CheckVersion  = await versionManager.update(FilesModel.version.id,version)
          if(!CheckVersion){
               return { status:false, error: "Error on update plugin. PackageId dont found." }
          }
          
          // ftpManager.upload(req.file.filename).finally(()=>filesService.delFile(filename))
          //filesService.delFile(filename)
          FilesModel.filename = file.filename
          FilesModel.name = file.name
          FilesModel.type = file.type
          FilesModel.repo = file.repo
          FilesModel.url = file.url
          await FilesModel.save()
          
          return res.json({status:true});
          
          versionManager.delete(version_id).finally(()=>console.log('deu erro no version.'))
          return res.json({status:false});
          
          
     }
     
     
}