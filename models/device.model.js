var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const DeviceSchema = new mongoose.Schema({
    id_device: {type: Number,required:true},
    id_owner: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
},
    {
        collection: 'device_dbs'
});

DeviceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Device = module.exports = mongoose.model('device', DeviceSchema);
  
