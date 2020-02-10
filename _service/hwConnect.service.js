const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const hwConnect = dbs.hwConnect;
module.exports = {
    findhwConnect
}
// Thời gian sống của token
async function findhwConnect({remoteAdress}) {
    return await hwConnect.findOne({remoteAdress});
    // console.log(hw);
}