const express = require('express');
const router = express.Router();
const userService = require('../_service/user.service');

async function login(req, res, next) {
     userService.authenticate(req.body)
    .then(user_mobi => user_mobi ? res.json(user_mobi) : res.status(400).json({ message: 'Username or password is incorrect' }))
    .catch(err => next(err));
}

async function register(req, res, next) {
    userService.create(req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

async function getAll(req, res, next) {
userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

async function getCurrent(req, res, next) {
userService.getById(req.user.sub)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

async function getById(req, res, next) {
userService.getById(req.params.id)
    .then(user => user ? res.json(user) : res.sendStatus(404))
    .catch(err => next(err));
}

async function update(req, res, next) {
userService.update(req.params.id, req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
}

async function _delete(req, res, next) {
userService.delete(req.params.id)
    .then(() => res.json({}))
    .catch(err => next(err));
}

module.exports = {
    login,
    register,
    getAll,
    getCurrent,
    getById,
    update,
    delete: _delete
};