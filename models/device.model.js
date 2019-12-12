var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    Lon: String,
    Lati: String,
    ID_Device: String,
},
    {
        collection: 'device_dbs'
});

UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
  
