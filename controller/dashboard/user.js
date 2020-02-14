//khối liên quan đến react manager
const managerUser = require("../../_service/manager/user/index");
module.exports = {
    overview,
    isLogined,
    update,
    _delete,
    getAll,
    getCurrent,
    getById,
    addUser,
    getUserByPhone,
    login
}
function login(req, res, next) {
    managerUser.login(req.body)
        .then(() => res.json("OK"))
        .catch(err => next(err));
}

function overview(req, res, next) {
    managerUser.getOverView()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
}
function isLogined(req, res, next) {            // check đã login hay chưa?
    res.json({});
}


function update(req, res, next) {
    managerUser.update(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    managerUser.getAll()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    managerUser.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    managerUser.getById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    managerUser._delete(req.params.id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function addUser(req, res, next) {
    managerUser.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getUserByPhone(req, res, next) {
    managerUser.findUserByPhone(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}