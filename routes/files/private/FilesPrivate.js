const FilesController = require("../../../controller/FilesController")

module.exports = (router) => {
  router.delete("/files/delete",FilesController.DeletarArquivo);
  
  router.get("/user/files",FilesController.ArquivosPorUsuario);

  router.post("/files/upload",FilesController.EnviarArquivo);

  router.put("/files/update/:versionid",FilesController.AtualizarArquivo);

  //test routes. we need to separe this after..

}

