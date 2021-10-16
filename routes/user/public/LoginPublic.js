const AuthController = require("../../../controller/AuthController.js");


module.exports = (router) => {
    router.post("/login", AuthController.login);
    router.post("/register", AuthController.register);

}