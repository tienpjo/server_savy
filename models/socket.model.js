var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const hwConnectSchema = new mongoose.Schema({
    deviceId: { type: Array, required: true },
    hwConnect: [{ type: Array, require: true }],
    actionCtrl: { type: String }
},
    {
        collection: 'hwConnect_dbs'
    });

hwConnectSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const hwConnect = module.exports = mongoose.model('hwConnect', hwConnectSchema);

