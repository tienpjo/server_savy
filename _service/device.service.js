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
    find_device,
    update
}

async function addDevice(uuid ,deviceParam,pairKey) {                  // thêm Device vào tài khoản
    if (await Device.findOne( {deviceId:deviceParam.deviceId })) {
        throw 'Device "' + deviceParam.deviceId + '" is already';
    }
    // console.log(req.jwtDecoded);
    const device = new Device(deviceParam);
    device.ownerId = uuid;
    device.pairKey = Array.from(String(pairKey)).map(Number);
    await device.save();
}

async function delete_device(id) {                                      // delete Device (admin)
    await User.findByIdAndRemove(id);
}

async function find_device(uuid){                                       // tìm kiếm Device của từng user            
   return await Device.find({"ownerId":uuid}).select('-ownerId').select('-__v');
}

async function find_tracking_device(device) {                           // tạm thời đang lấy tracking từ mongo, lấy track theo DeviceId
    return await Tracking.findOne(device).sort({createdAt:-1}).select('-createdAt').limit(1).select('-deviceId').select('-__v').select('-_id');
}

async function update(id,deviceParam) {                                 // cho phép user sửa các dữ liệu cơ bản như là smartKey,.. 
    const device = await Device.findOne({"deviceId":id});
    if (!device) throw 'Device not found';
    if (device.smartKey !== deviceParam.smartKey && await Device.findOne({ smartKey: deviceParam.smartKey })) {
      throw + userParam.smartKey + '" is already';
    }
    Object.assign(device, deviceParam);
    await device.save();
}