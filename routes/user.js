const express = require('express');
const router = express.Router();
const apiUser = require("../controller/UserController");

const AuthMiddleWare = require("../middleware/AuthMiddleware");
const apiDevice = require("../routes/device");
let initAPIs = (app) => {
    router.post('/login', apiUser.login);
    router.post('/register', apiUser.register);
    router.use(AuthMiddleWare.isAuth);
<<<<<<< HEAD
    router.post('/add',add);
    router.post('/delete_device',delete_device);

    // router.get('/', getAll);
    // router.get('/current', getCurrent);
    // router.get('/:id', getById);
    // router.get('/:id', update);
    // router.delete('/:id', _delete);
    router.post('/logout',logout);
=======
    router.post('/add',apiUser.add);
    router.get('/', apiUser.getAll);
    router.get('/current', apiUser.getCurrent);
    // router.get('/:id', getById);
    // router.get('/:id', update);
    // router.delete('/:id', _delete);
>>>>>>> 0f06f011ef7e4ae7bc30b464371d0e0e375222b7
    return app.use("/users", router);
}

module.exports = initAPIs;
<<<<<<< HEAD
    /* DEVICE */
function add (req, res, next) {
    console.log(req.jwtDecoded.sub._id);
    deviceService.addDevice(req.jwtDecoded.sub._id,req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
  };

function delete_device(req,res,next){
    deviceService.delete_device(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

/* BIKE TRACKING */


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

function logout (req,res,) {
    res.status(200).send({ auth: false, token: null });
}
=======

>>>>>>> 0f06f011ef7e4ae7bc30b464371d0e0e375222b7
