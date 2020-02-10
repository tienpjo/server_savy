const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const hwConnect = dbs.hwConnect;
const sttSever = dbs.Status;
module.exports = {
    findhwConnect
}
// Thời gian sống của token
async function findhwConnect({adress}) {
    const hw = await hwConnect.findOne({adress});
    var sttSrv = {
        deviceId:hw.deviceId,
        sttGPS:"-",
        sttConnect:"CLOSE",
    }
    var stt = new hw(sttSrv);
    stt.save(function (err) {
      if (err) throw err;
      console.log('Save SOCKET Succesfully.');
    });
    // console.log(hw);
}