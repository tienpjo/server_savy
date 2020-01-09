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

module.exports = {
    addDevice,
    delete_device,
    find_tracking_device,
    find_device
}

async function addDevice(uuid ,deviceParam,pairKey) {
    if (await Device.findOne( {deviceId:deviceParam.deviceId })) {
        throw 'Device "' + deviceParam.deviceId + '" is already';
    }
    // console.log(req.jwtDecoded);
    const device = new Device(deviceParam);
    device.ownerId = uuid;
    device.pairKey = Array.from(String(pairKey)).map(Number);
    
    await device.save();
}

async function delete_device(id) {
    await User.findByIdAndRemove(id);
}

async function find_device(uuid){
   return await Device.find({"ownerId":uuid}).select('-ownerId').select('-_id').select('-smartKey').select('-__v');
}

async function find_tracking_device(device) {
    return await Tracking.findOne({device}).select('-deviceId').select('-__v').select('-_id');
}