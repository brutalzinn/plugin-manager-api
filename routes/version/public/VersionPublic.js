const VersionController = require("../../../controller/VersionController.js");


module.exports = (router) => {
    router.post("/version/check", VersionController.checkVersion);
}