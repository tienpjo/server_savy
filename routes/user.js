const express = require('express');
const router = express.Router();
const apiUser = require("../controller/UserController");
const userService = require('../_service/user.service');
const deviceService = require('../_service/device.service');
const trackService = require("../_service/socket.service");
const hwConnect = require("../_service/socket.service");
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const apiDevice = require("../routes/device");
const rand = require("random-int");

let initAPIs = (app) => {
    router.post('/register', AuthMiddleWare.userValidationRules(), AuthMiddleWare.validate, register);
    router.post('/login', login);
    router.use(AuthMiddleWare.isAuth);
    router.post('/add', add);
    router.post('/delete_device', delete_device);
    router.get('/get_tracking', (req, res) => {
        // console.log(req..deviceId);
        console.log(req.body);
        deviceService.find_tracking_device(req.params.deviceId)
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
            });
    });
    router.get('/find_device', find_device);
    router.get('/deviceUpdate',deviceUpdate);
    // router.get('/', getAll);
    // router.get('/current', getCurrent);
    // router.get('/:id', getById);
    // router.get('/:id', update);
    // router.delete('/:id', _delete);
    router.post('/logout', logout);
    return app.use("/users", router);
}

module.exports = initAPIs;

/* DEVICE */
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
    deviceService.update(req.params._id, req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
}

/* CONTROL MOTO */


/* END DEVICE */
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
