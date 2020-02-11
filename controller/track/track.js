
const deviceService = require('../../_service/device/device.service');
module.exports = {
    getTracking
}

function getTracking(req, res, next) {
    deviceService.find_tracking_device(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
};