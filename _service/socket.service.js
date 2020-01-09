var app = require('express')();
var server = require('http').Server(app);
const dbs = require('../_helpers/database');
const hwConnect = dbs.HwConnect;
var hwCtrl = require('../index')

module.exports = {
    controlDevice,
}

// function ctrlClientOn(hw_connect) {
//     io.on('connection', function (socket) {
//       console.log(hw_connect);
//      hw_connect.write('MOTO_ON');
//     });
// }

async function controlDevice(deviceParam) {
    return await hwConnect.findOne({"deviceId":deviceParam.deviceId});
}




