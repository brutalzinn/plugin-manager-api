const FilesController = require("../../../controller/FilesController")

module.exports = (router) => {
  router.delete("/delete",FilesController.delete);
  router.post("/upload",FilesController.upload);
}

