const config = require('../../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../../_helpers/database');
const userService = require('../_service/user.service');
const authMiddleware = require('../../middleware/AuthMiddleware')
const Device = dbs.Device;
const User = dbs.User;
const Token = dbs.Token;
const Tracking = dbs.Tracking;

module.exports = {
    getOverView
}

async function getOverView() {                                      // delete Device (admin)
    const totalUser = await User.count({});
    const totalDevice = await Device.count({});
    var total = {
        totalUser:totalUser,
        totalDevice:totalDevice
    }
    return total;
}