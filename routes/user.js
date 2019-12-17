const express = require('express');
const router = express.Router();
const apiUser = require("../controller/UserController");

const AuthMiddleWare = require("../middleware/AuthMiddleware");
const apiDevice = require("../routes/device");
let initAPIs = (app) => {
    router.post('/login', apiUser.login);
    router.post('/register', apiUser.register);
    router.use(AuthMiddleWare.isAuth);
    router.post('/add',apiUser.add);
    router.get('/', apiUser.getAll);
    router.get('/current', apiUser.getCurrent);
    // router.get('/:id', getById);
    // router.get('/:id', update);
    // router.delete('/:id', _delete);
    return app.use("/users", router);
}

module.exports = initAPIs;

