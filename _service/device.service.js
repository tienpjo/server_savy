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
async function addDevice(deviceParam) {
    if (await Device.findOne({ id_device: deviceParam.id_device })) {
        throw 'Device "' + deviceParam.id_device + '" is already taken';
    }
        const device = new Device(deviceParam);
        await device.save();

}