const express = require('express');
const router = express.Router();
const authorize = require("../middleware/authorize");
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const getStatus = require('../controller/sttServer/getStatus');
const user = require('../controller/login/login');
const device = require('../controller/device/device');
const track = require('../controller/track/track');


let initAPIs = (app) => {
    router.post('/register', AuthMiddleWare.userValidationRules(), AuthMiddleWare.validate, user.register);
    router.post('/login', user.login);
    router.use(AuthMiddleWare.isAuth);                               // chặn tất cả các truy cập sau login bằng việc Authention
    router.post('/add', device.add);
    router.post('/delete_device', device.delete_device);
    router.get('/find_device', device.find_device);
    router.post('/deviceUpdate', device.deviceUpdate);
    router.post('/get_tracking', track.getTracking);                              
    router.get('/getStatusSrv', getStatus.getStatusSrv);
    // router.get('/current', getCurrent);
    // router.get('/:id', getById);
    // router.get('/:id', update);
    // router.delete('/:id', _delete);
    router.post('/logout', user.logout);
    return app.use("/users", router);
}


module.exports = {
    initAPIs
}
