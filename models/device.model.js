var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const DeviceSchema = new mongoose.Schema({
    deviceId: { type: Number, required: true },
    ownerId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    smartKey: { type: String, required: true },
    mobileSim: { type: String, required: true },
    bikeName: { type: String, required: true },
    pairKey: { type: Number, required: true }
},
    {
        collection: 'device_dbs'
    });

DeviceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Device = module.exports = mongoose.model('device', DeviceSchema);

