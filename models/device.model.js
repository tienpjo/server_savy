var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const DeviceSchema = new mongoose.Schema({
    deviceId: { type: Array, required: true },
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],   // device này của user nào
    smartKey: { type: String },                         // 9 số để mở khẩn cấp
    mobileSim: {type: String, required: true },         // số của sim
    bikeName: { type: String, required: true },         // 
    deviceType: {type:Number},                          // loại deviceType là gì: (1) device có Sim, (2) device no Sim
    pairKey: { type: Array, required: true }            // mã pairKey gốm 10 số gửi cho app
},
    {
        collection: 'device_dbs'
    });

DeviceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Device = module.exports = mongoose.model('device', DeviceSchema);

