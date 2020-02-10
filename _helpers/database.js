const config = require('../config.json');
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || config.connectionString, { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = {
    User: require('../models/user.model'),
    Device: require('../models/device.model'),
    Tracking: require('../models/tracking'),
    Status: require('../models/status.model'),
    hwConnect: require('../models/hwConnect.model'),
};