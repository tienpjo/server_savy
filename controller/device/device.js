

const deviceService = require('../../_service/device/device.service');
const rand = require("random-int");

module.exports = {
    add,
    delete_device,
    find_device,
    deviceUpdate
}
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