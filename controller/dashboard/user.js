//khối liên quan đến react manager
const managerUser = require("../../_service/manager/user/index");
const bcrypt = require('bcryptjs');
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
    managerUser.update(req.body.user._id, req.body.user)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    managerUser.getAll()
        .then(users => res.json({ data: users }))
        .catch(err => next(err));
}

function getCurrent(req, res, next) {
    managerUser.getById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getById(req, res, next) {
    let userId;
    try {
        userId = req.params["id"];
    } catch (error) {
        res.send({ error: error });
        console.error("queryUserById", error);
        return;
    }
    managerUser.getById(userId)
        .then(user => res.json({ data: user }))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    let id = req.params["id"];

    console.log(id);
    // console.log(req.params._id);
    managerUser._delete(req.params._id)
        .then(() => res.json({}))
        .catch(err => next(err));
}
function addUser(req, res, next) {
    //  console.log(req.body.user);
    managerUser.addUser(req.body.user)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getUserByPhone(req, res, next) {
    let mobile;
    try {
        mobile = req.params["mobile"];
        mobile = mobile.slice(1);
    } catch (error) {
        res.json({ error: error });
        console.error("queryUserByPhone", error);
        return;
    }
    managerUser.findUserByPhone(mobile)
        .then((users) => res.json({ data: users }))
        .catch(err => next(err));
}