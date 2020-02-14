const dbs = require('../../../_helpers/database');
const Device = dbs.Device;

module.exports = {
    getAllDevice,
    edit,
    _delete,
    getDeviceById,
    getDeviceListByDeviceId,
}
async function getAllDevice() {
    return await Device.find().select('__v');
}

async function edit(id, deviceParam) {
    const device = await Device.findById(id);
    if (!device) throw 'Device not found';
    Object.assign(device, deviceParam);
    await device.save();
}

async function _delete(id) {
    await Device.findByIdAndRemove(id);
}

async function getDeviceById(id) {
    return await Device.findById(id);
}

async function getDeviceListByDeviceId(deviceId) {
    return await Device.findById(deviceId);
}