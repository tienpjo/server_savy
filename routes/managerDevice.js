const dashboardDevice = require('../controller/dashboard/device');
const express = require('express');
const router = express.Router();

let DeviceManagerApi = (appApiDevice) => {
    router.get('/DeviceList',dashboardDevice.getDeviceAll);
    router.post('/getDeviceListByDeviceId',dashboardDevice.deviceGetDeviceList);
    router.post('/edit',dashboardDevice.deviceEdit);
    router.delete('/:id',dashboardDevice.deviceDelete);
    router.get('/getDeviceByOwner',dashboardDevice.getDeviceByOwnerId);
    return appApiDevice.use("/device",router);
}
module.exports = DeviceManagerApi;
