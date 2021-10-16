const FilesController = require("../../../controller/FilesController")

module.exports = (router) => {
  router.get("/download",FilesController.download);
  router.get("/",FilesController.index);
}

