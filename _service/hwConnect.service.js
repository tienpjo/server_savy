const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const hwConnect = dbs.hwConnect;
const status = dbs.Status;
module.exports = {
    findhwConnect,
    findStatusConnect
}

async function deleteConnect(id) {
    await hwConnect.findByIdAndDelete(id);
}

async function findhwConnect({remoteAdress}) {
    const hw =  await hwConnect.findOne({remoteAdress});
    var sttSrv = {
        deviceId: hw.deviceId,
        sttGPS: "-",
        sttConnect: "CLOSE",
    }
    var stt = new status(sttSrv);
    stt.save(function (err) {
        if (err) throw err;
        deleteConnect(hw._id);
    });
}

async function findStatusConnect(deviceId) {                           // tạm thời đang lấy tracking từ mongo, lấy track theo DeviceId
    return await hwConnect.findOne(deviceId);
}