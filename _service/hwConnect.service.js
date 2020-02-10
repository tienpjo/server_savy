const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const hwConnect = dbs.hwConnect;
const status = dbs.Status;
module.exports = {
    findhwConnect
}
// Thời gian sống của token
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
        console.log('Save Stus Succesfully.');
        deleteConnect(hw._id);
    });
    // console.log(hw);
}

async function deleteConnect({id}) {
    await hwConnect.findByIdAndDelete(id);
}