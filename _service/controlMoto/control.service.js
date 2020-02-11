const dbs = require('../../_helpers/database');
const hwConnect = dbs.HwConnect;

module.exports = {
    controlDevice,
}


async function controlDevice(deviceParam) {       // app sẽ gửi lên 1 post để điều khiển device bật/tắt 
    return await hwConnect.findOne({deviceId});
}




