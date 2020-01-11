var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const DeviceSchema = new mongoose.Schema({
    deviceId: { type: Array, required: true },
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    smartKey: { type: String },
    mobileSim: {type: String, required: true },
    bikeName: { type: String, required: true },
    deviceType: {type:Number},
    pairKey: { type: Array, required: true }

},
    {
        collection: 'device_dbs'
    });

DeviceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Device = module.exports = mongoose.model('device', DeviceSchema);

