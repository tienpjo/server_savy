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
async function addDevice(req, res, deviceParam) {
    if (await Device.findOne({ id_device: deviceParam.id_device })) {
        throw 'Device "' + deviceParam.id_device + '" is already taken';
    }
    const tokenFromClient = req.body.token || req.query.token || req.headers["x-access-token"];
    const decoded = await userService.verifyToken(tokenFromClient, config.secret);
    // Nếu token hợp lệ, lưu thông tin giải mã được vào đối tượng req, dùng cho các xử lý ở phía sau.
    req.jwtDecoded = decoded;
    console.log(decoded);
    const device = new Device(deviceParam);
    await device.save();

}