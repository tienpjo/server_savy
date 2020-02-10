const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const hwConnect = dbs.hwConnect;
const status = dbs.Status;
module.exports = {
    findhwConnect,
    findStatusConnect,
    updateSttServer
}

async function deleteConnect(id) {
    await hwConnect.findByIdAndDelete(id);
}

// tim kiem connect da duoc luu trong mongod

async function findhwConnect({ remoteAdress }) {
    const hw = await hwConnect.findOne({ remoteAdress });
    var sttSrv = {
        deviceId: hw.deviceId,
        sttGPS: "-",
        sttConnect: "CLOSE",
    }
    updateSttServer(deviceId,sttSrv);
}

// find status de tao roter cho app get
async function findStatusConnect(deviceId) {
    return await status.findOne(deviceId);
}
// tao async thuc hien update trang thai cua server - sim
async function updateSttServer(id,sttParam) {
    const stt = await status.findById(id);
    if (stt) {
        Object.assign(user, sttParam);
        await stt.save;
        deleteConnect(hw._id);
    }
}