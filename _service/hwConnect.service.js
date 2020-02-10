const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dbs = require('../_helpers/database');
const hwConnect = dbs.hwConnect;
const sttSever = dbs.Status;
module.exports = {
    findhwConnect
}
// Thời gian sống của token
async function findhwConnect({adress}) {
    return await hwConnect.findOne({adress});
    // console.log(hw);
}