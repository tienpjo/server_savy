var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const DeviceSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Lon: String,
    Lati: String,
    ID_Device: String,
},
    {
        collection: 'device_dbs'
});

DeviceSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Device = module.exports = mongoose.model('device', DeviceSchema);
  
