var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

// tạm bỏ models này @@
const hwConnectSchema = new mongoose.Schema({
    deviceId: { type: Array, required: true },       
    hwConnect: [{ type: Array, require: true }],       // hwConnect dự định sẽ lưu lại liên kết socket
    actionCtrl: { type: String }
},
    {
        collection: 'hwConnect_dbs'
    });

hwConnectSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const hwConnect = module.exports = mongoose.model('hwConnect', hwConnectSchema);

