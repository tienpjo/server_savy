const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const userService = require('../_service/user.service');
const authMiddleware = require('../middleware/AuthMiddleware')
const Device = dbs.Device;
const User = dbs.User;
const Token = dbs.Token;

module.exports = {
    addDevice
}
async function addDevice(req,deviceParam) {
    if (await Device.findOne({ id_device: deviceParam.id_device })) {
        throw 'Device "' + deviceParam.id_device + '" is already taken';
    }
    // const id__1 = authMiddleware.getToken();
    console.log(req.jwtDecoded);
    const device = new Device(deviceParam);
    // device.id_owner = id__1;
    await device.save();
}