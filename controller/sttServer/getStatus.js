const hwConnect = require('../../_service/hwConnect.service')
module.exports = {
    getStatusSrv
}
function getStatusSrv(req, res, next) {
    hwConnect.findStatusConnect(req.body)
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
        });
};
