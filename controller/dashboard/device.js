const manageDevice = require("../../_service/manager/device/index");
module.exports = {
    getDeviceAll,
    getDeviceCurrent,
    getDeviceById,
    deviceDelete,
    deviceEdit,
    deviceGetDeviceList,
    getDeviceByOwnerId
}
function getDeviceAll(req, res, next) {
    manageDevice.getAllDevice()
    .then(devices => res.status(200).json({"data":devices}))
    .catch(err => next(err));
}

function getDeviceByOwnerId (req,res,next) {
    console.log('second' + req.body.ownerId);
    manageDevice.getDeviceByOnwerId(req.body.ownerId)
    .then(devices => res.status(200).json({"data":devices}))
    .catch(err => next(err));
}

function deviceEdit(req, res, next) {
    manageDevice.edit(req.params.id, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getDeviceCurrent(req, res, next) {
    mmanageDevice.getDeviceById(req.user.sub)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getDeviceById(req, res, next) {
    manageDevice.getDeviceById(req.params.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function deviceDelete(req, res, next) {
    let id = req.params["id"];
    manageDevice._delete(id)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deviceGetDeviceList(req,res,next) {
    manageDevice.getDeviceListByDeviceId(req.body.deviceId)
        .then((device) => res.json({data : device}))
        .catch(err => next(err));
}