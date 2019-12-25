var mongoClient = require('mongoose');
const tracking = require('../models/tracking');
const LocalStrategy = require('passport-local').Strategy;
const dbs = require('../_helpers/database');
const Device = dbs.Device;

function save_tracking(data_idDevice, data_long, data_lati) {
    mongoClient.connect('mongodb://127.0.0.1:27017/db_server', function (err, db) {
        var bike_tracking = new tracking({
            _id: new mongoClient.Types.ObjectId(),
            id_device: data_idDevice,
            long: data_long,
            lati: data_lati,
            date: Date.now()
        });
        find_device_id(data_idDevice);
    });
}
function find_device_id(id_device) {
    Device.findOne({ id_device: id_device }, function (err, user) {
        if (err) { return false }
        if (!id_device) {
            return false;
        }
        if (id_device) {
            bike_tracking.save(function (error) {
                if (err) throw err;
                console.log('User Test successfully saved.');
            })
        }
    })
}
module.exports = save_tracking;