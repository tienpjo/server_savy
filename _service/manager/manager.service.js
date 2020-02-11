const dbs = require('../../_helpers/database');
const Device = dbs.Device;
const User = dbs.User;


module.exports = {
    getOverView
}

async function getOverView() {                                      // delete Device (admin)
    const totalUser = await User.count({});
    const totalDevice = await Device.count({});
    var total = {
        totalUser:totalUser,
        totalDevice:totalDevice
    }
    return total;
}