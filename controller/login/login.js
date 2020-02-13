const userService = require('../../_service/user/user.service');

module.exports ={
    login,
    register,
    logout
}

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

function logout(req, res, ) {
    res.status(200).send({ auth: false, token: null });
}