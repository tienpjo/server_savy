var express = require('express');
var app = require('express')();
var server = require('http').Server(app);
const dbs = require('../_helpers/database');
const hwConnect = dbs.HwConnect;
var io = require('socket.io')(server);
module.exports = {
    controlDevice,
}

async function controlDevice(deviceParam) {
    const user_mobi = hwConnect.findOne({ deviceId: deviceParam.deviceId });
    if (user_mobi) {
        io.on('connection', function (socket) {
            if (deviceParam.actionCtrl === "ON") {
                socket.on('bat-xe-tu-xa', function () {
                    user_mobi.hwConnect.write('MOTO_ON');
                });
            }
            if (deviceParam.actionCtrl === "OFF") {
                socket.on('tat-xe-tu-xa', function () {
                    user_mobi.hwConnect.write('MOTO_OFF');

                });
            }
        });
    }
    else {
        throw 'Device "' + deviceId + '" is not found';
    }

}




