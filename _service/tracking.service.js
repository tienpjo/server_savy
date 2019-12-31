var mongoClient = require('mongoose');
const tracking = require('../models/tracking');
const LocalStrategy = require('passport-local').Strategy;
const dbs = require('../_helpers/database');
const Tracking = dbs.Tracking;
const Device = dbs.Device;
function save_tracking(data_idDevice, data_long, data_lati) {

};
async function find_tracking_device(id_owner,device) {
    if (!(await Device.findOne({ id_owner: id_owner }))) {
        throw 'Owner "' + id_owner + '" not found';
    }
    if (!(await Device.findOne({ id_device: device }))) {
        throw 'Device "' + device + '" not found';
    }
    if (await Device.findOne({ id_owner: id_owner })) {
        if (await Device.findOne({ id_owner: id_owner })) {
            await Tracking.findOne({id_device:device});
        }
    }
}
module.exports = find_tracking_device;