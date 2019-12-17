const express = require("express");
const router = express.Router();
const apiDevice = require("../controller/DeviceController");
const apiUser = require("../controller/UserController");
const AuthMiddleWare = require("../middleware/AuthMiddleware");

let init_user_API = (app) => {
    router.post('/login', apiUser.login);
    router.post('/register', apiUser.register);
    router.use(AuthMiddleWare.isAuth);
    router.post('/add',apiDevice.add);
    return app.use("/", router);
}

module.exports = init_user_API;

