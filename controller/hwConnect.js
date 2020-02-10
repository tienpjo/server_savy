const hwConnect = require('../_service/hwConnect.service');
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
    var stt = new hwConnect(sttSrv);
    stt.save(function (err) {
        if (err) throw err;
        console.log('Save SOCKET Succesfully.');
    });
}