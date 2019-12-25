var mongoClient = require('mongoose');
const tracking = require('../models/tracking');
const LocalStrategy = require('passport-local').Strategy;
const dbs = require('../_helpers/database');
const Device = dbs.Device;

function save_tracking(data_idDevice, data_long, data_lati) {

};
function find_device_id(id_device) {
    Device.findOne({ id_device: id_device }, function (err, id_device) {
        if (id_device) {
            bike_tracking.save(function (error) {
                if (err) throw err;
                console.log('User Test successfully saved.');
            })
        }
    })
}
module.exports = save_tracking;