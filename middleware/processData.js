const dbs = require('../_helpers/database');
const Tracking = dbs.Tracking;
const Status = dbs.Status;
function getTracking(data, id_device_gps) {
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
    var bikeTracking = {
        deviceId: id_device_gps,
        bat: data[2],
        status: stt,
        lati: data[4],
        long: data[5],
        createdAt: Date.now(),
        move: movePer
    };
    var track = new Tracking(bikeTracking);
    track.save(function (err) {
        if (err) throw err;
        console.log('User Test successfully saved.');
    });
}

function getStt(data,id_device_gps)
{
    var bikeStatus = {
        deviceId:id_device_gps,
        sttGPS:data[1],
        // sttConnect:data[2]
    }
    var stt = new Status(bikeStatus);
    stt.save(function (err) {
        if (err) throw err;
        console.log('Save Status Succesfully.');
    });
}

function closeHandler(data)
{
    
}
module.exports = {
    getTracking,
    getStt
}