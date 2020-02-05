const dbs = require('./_helpers/database');
const Tracking = dbs.Tracking;

function processData(data, id_device_gps) {
    var movePer;
    var stt;
    if (data[0] == "MOTO-RUNNING" || data[0] == "MOTO-STOPING") {
        if (data[0] == "MOTO-RUNNING") {
            movePer = "RUN"
        }
        if (data[0] == "MOTO-STOPING") {
            movePer = "STOP"
        }
        if (data[3] == "OFF\n") {
            stt = "OFF"
        }
        if (data[3] == "ON\n") {
            stt = "ON"
        }
    }
    var bike_tracking = {
        deviceId: id_device_gps,
        bat: data[2],
        status: stt,
        lati: data[4],
        long: data[5],
        createdAt: Date.now(),
        move: movePer
    };
    var track = new Tracking(bike_tracking);
    track.save(function (err) {
        if (err) throw err;
        console.log('User Test successfully saved.');
    });
}
module.exports = {
    processData
}