const FilesController = require("../../../controller/FilesController")

module.exports = (router) => {
  router.get("/files/download",FilesController.download);
  router.get("/files",FilesController.index);
  router.get("/files/search",FilesController.search);

}

