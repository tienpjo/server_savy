var app = require('express')();
var server = require('http').Server(app);
const dbs = require('../_helpers/database');
const hwConnect = dbs.HwConnect;
var hwCtrl = require('../index')

module.exports = {
    controlDevice,
}

async function controlDevice(deviceParam) {
    const user_mobi = await hwConnect.findOne({"deviceId":deviceParam.deviceId});
    console.log(deviceParam.actionCtrl);
    if (user_mobi) {
        console.log(user_mobi);
        if (deviceParam.actionCtrl === "ON") {
            console.log(OK);
            hwCtrl.ctrlClientOn(user_mobi.hwConnect);
        }
        if (deviceParam.actionCtrl === "OFF") {
            hwCtrl.ctrlClientOff(user_mobi.hwConnect);
        }
    }
    else {
        throw 'Device "' + deviceId + '" is not found';
    }
    return user_mobi;
}




