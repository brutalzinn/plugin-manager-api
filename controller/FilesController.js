

const path = require('path');
const filesService = require('../service/filesService')
const uuid = require('uuid').v4
const tmpDirectory = path.join(path.dirname(require.main.filename),'uploads')

//ALL THIS CODE NEEDS BE MOVEED TO A SERVICE LAYER.
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
    const { page, size } = req.query;
    return res.send(await filesService.index(page, size))
  },
  
  async ArquivosPorUsuario(req, res) {
    const { page, size } = req.query;
    return res.send(await filesService.ArquivosDeUsuario(req.userId, page, size))
  },
  
  async BuscaElasticSearch(req,res) {
    const { page, size } = req.query;

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
      res.send(await filesService.Busca(searchParams,page, size))
    }
    catch(err){
      res.status(500).send({
        error: 'An error has occured trying to get the articles' + err
      })
    }
  },
  
  async DeletarArquivo(req, res) {
    return await filesService.DeletarArquivo(req.query.filepath)
  },
  async download(req, res) {
    return res.download(req.query.filepath);
  },
  async EnviarArquivo(req, res) {
    multerUpload.single('plugin')(req, res, async function (err) {
      if(!req.file){
        return res.status(400).json({ error: "Error on upload plugin" });
      }
      let result = await filesService.EnviarArquivo(req.userId,req.file.filename,req.body)
      return result.status == true ? res.status(200).send(result) : res.status(400).send(result);    
    })
  },
  async AtualizarArquivo(req, res) {
    multerUpload.single('plugin')(req, res, async function (err) {
      if(!req.file){
        return res.status(400).json({ error: "Error on update plugin" });
      }
      let result = await filesService.AtualizarArquivo(req.userId,req.file.filename,req.body)
      return result.status == true ? res.status(200).send(result) : res.status(400).send(result);  
      })}    
    }