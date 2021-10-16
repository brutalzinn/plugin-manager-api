const FilesController = require("../../../controller/FilesController")

module.exports = (router) => {
  router.delete("/files/delete",FilesController.delete);
  router.post("/files/upload",FilesController.upload);
}

