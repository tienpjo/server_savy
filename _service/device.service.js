const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const Device = dbs.Device;
const User = dbs.User;
module.exports = {
    addDevice
}
async function addDevice(deviceParam) {
    if (await Device.findOne({ id_device: deviceParam.id_device })) {
        throw 'Device "' + deviceParam.id_device + '" is already taken';
    }
    const user = new User();
    const device = new Device (deviceParam);
    device.id_owner = user._id;
    await device.save();
}