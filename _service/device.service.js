const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const userService = require('../_service/user.service');
const Device = dbs.Device;
const User = dbs.User;
module.exports = {
    addDevice
}
async function addDevice(req,deviceParam) {
    if (await Device.findOne({ id_device: deviceParam.id_device })) {
        throw 'Device "' + deviceParam.id_device + '" is already taken';
    }
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    if (tokenFromClient) {
        const device = new Device(deviceParam);
        const decoded = await userService.verifyToken(tokenFromClient, config.secret);
        console.log(decoded.sub._id);
        device.id_owner = decoded.sub._id;
        await device.save();
    }

}