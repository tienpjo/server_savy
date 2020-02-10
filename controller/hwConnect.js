const hwConnect = require('../_service/hwConnect.service');
const dbs = require('../_helpers/database');
const status = dbs.Status;
module.exports = {
    hwCloseSocket
}
function hwCloseSocket(remoteAdress) {
    const hw = hwConnect.findhwConnect(remoteAdress);
    var sttSrv = {
        deviceId: hw.deviceId,
        sttGPS: "-",
        sttConnect: "CLOSE",
    }
    var stt = new status(sttSrv);
    stt.save(function (err) {
        if (err) throw err;
        console.log('Save SOCKET Succesfully.');
    });
}