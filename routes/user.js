const express = require('express');
const router = express.Router();
const apiUser = require("../controller/UserController");
const userService = require('../_service/user.service');
const deviceService = require('../_service/device.service');
const trackService = require("../_service/socket.service");
const authorize = require("../middleware/authorize");
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const managerDevice = require("../_service/manager.service");
const rand = require("random-int");

let initAPIs = (app) => {
    router.post('/register', AuthMiddleWare.userValidationRules(), AuthMiddleWare.validate, register);
    router.post('/login', login);
    router.use(AuthMiddleWare.isAuth);                               // chặn tất cả các truy cập sau login bằng việc Authention
    router.post('/add', add);
    router.post('/delete_device', delete_device);
    router.post('/get_tracking', getTracking);                    // hàm get tracking, @@ kdcviettaiday           
    router.get('/find_device', find_device);
    router.post('/deviceUpdate', deviceUpdate);
    router.get('/isLogined', isLogined);
    router.get('/overview', overview);
    router.get('/getAllUser', getAll);
    // router.get('/current', getCurrent);
    // router.get('/:id', getById);
    // router.get('/:id', update);
    // router.delete('/:id', _delete);
    router.post('/logout', logout);
    return app.use("/users", router);
}

module.exports = initAPIs;

// các khối xử lý liên quan tracking cua bike

function getTracking(req, res, next) {
    deviceService.find_tracking_device(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
};


/* DEVICE */  // các khối xử lý liên quan đến device
function add(req, res, next) {
    console.log(req.jwtDecoded.sub._id);
    var pairKey = rand(1000000000, 9999999999);
    deviceService.addDevice(req.jwtDecoded.sub._id, req.body, pairKey)
        .then(() => {
            res.json(Array.from(String(pairKey)).map(Number));
        })
        .catch(err => next(err));
};

function delete_device(req, res, next) {
    deviceService.delete_device(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function find_device(req, res, next) {
    deviceService.find_device(req.jwtDecoded.sub._id)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
}
function deviceUpdate(req, res, next) {
    deviceService.update(req.body.deviceId, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
}

// các khối xử lý liên quan đến user
function login(req, res, next) {
    userService.authenticate(req.body)
        .then(user_mobi => user_mobi ? res.json(user_mobi) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function register(req, res, next) {
    userService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    userService.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    userService.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    userService.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function update(req, res, next) {
    userService.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    userService.delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function logout(req, res, ) {
    res.status(200).send({ auth: false, token: null });
}

//khối liên quan đến react manager

function overview(req, res, next) {
    managerDevice.getOverView()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
}
function isLogined(req, res, next) {            // check đã login hay chưa?
    res.json(200).json();
}
