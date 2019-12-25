const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const userService = require('../_service/user.service');
const authMiddleware = require('../middleware/AuthMiddleware')
const Device = dbs.Device;
const User = dbs.User;
const Token = dbs.Token;
var rand = require("generate-key");

module.exports = {
    addDevice,
    delete_device
}
async function addDevice(uuid , deviceParam) {
    if (await Device.findOne({ id_device: deviceParam.id_device })) {
        throw 'Device "' + deviceParam.id_device + '" is already taken';
    }
    // console.log(req.jwtDecoded);
    const device = new Device(deviceParam);
    device.id_owner = uuid;
    device.smk = rand.generateKey(9);
    await device.save();
}

async function delete_device(id) {
    await User.findByIdAndRemove(id);
}