const express = require('express');
const router = express.Router();
const userService = require('../_service/user.service');
const AuthMiddleWare = require("../middleware/AuthMiddleware");
const api_device =   require("../routes/device");
let initAPIs = (app) => {
    router.post('/login', login);
    router.post('/register', register);
    router.use(AuthMiddleWare.isAuth);
    router.post('/add-device',api_device.add_device);
    router.get('/', getAll);
    router.get('/current', getCurrent);
    router.get('/:id', getById);
    router.get('/:id', update);
    router.delete('/:id', _delete);
    router.post('/addDevice',addDevice)
    return app.use("/users", router);
}

module.exports = initAPIs;

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