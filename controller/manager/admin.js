//khối liên quan đến react manager
const managerDevice = require("../../_service/manager.service");
module.exports = {
    overview,
    isLogined
}
function overview(req, res, next) {
    managerDevice.getOverView()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
}
function isLogined(req, res, next) {            // check đã login hay chưa?
    res.json(200).json();
}
