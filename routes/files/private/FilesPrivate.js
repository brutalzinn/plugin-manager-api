const FilesController = require("../../../controller/FilesController")

module.exports = (router) => {
  router.delete("/files/delete",FilesController.delete);
  router.get("/user/files",FilesController.user);

  router.post("/files/upload",FilesController.upload);

  router.put("/files/update/:versionid",FilesController.update);

  //test routes. we need to separe this after..
  router.post("/files/upload/test",FilesController.uploadTest);

}

