const dashboardDevice = require('../controller/dashboard/device');
const express = require('express');
const router = express.Router();

let DeviceManagerApi = (appApiDevice) => {
    router.get('/DeviceList',dashboardDevice.getDeviceAll);
    router.post('/getDeviceListByDeviceId',dashboardDevice.deviceGetDeviceList);
    router.post('/edit',dashboardDevice.deviceEdit);
    router.get('/delete',dashboardDevice.deviceDelete);
    return appApiDevice.use("/device",router);
}
module.exports = DeviceManagerApi;