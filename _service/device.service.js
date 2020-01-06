const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const userService = require('../_service/user.service');
const authMiddleware = require('../middleware/AuthMiddleware')
const Device = dbs.Device;
const User = dbs.User;
const Token = dbs.Token;
const Tracking = dbs.Tracking;
var rand = require("generate-key");

module.exports = {
    addDevice,
    delete_device,
    find_tracking_device,
    find_device
}

async function addDevice(uuid , deviceParam) {
    if (await Device.findOne({ deviceId: deviceParam.deviceId })) {
        throw 'Device "' + deviceParam.deviceId + '" is already taken';
    }
    // console.log(req.jwtDecoded);
    const device = new Device(deviceParam);
    device.ownerId = uuid;
    device.pairKey = rand.generateKey(9);
    await device.save();
    return device.pairKey;
}

async function delete_device(id) {
    await User.findByIdAndRemove(id);
}

async function find_device(uuid){
    await Device.find({"ownerId":uuid});
}

async function find_tracking_device(device) {
    return await Tracking.find({"deviceId":device});
}