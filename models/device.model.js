var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const DeviceSchema = new mongoose.Schema({
    id_device: Number,
    id_owner: [{ type: Schema.Types.ObjectId, ref: 'User' }],
},
    {
        collection: 'device_dbs'
});

DeviceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Device = module.exports = mongoose.model('device', DeviceSchema);
  
