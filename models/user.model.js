var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name : String,
    Lon: String,
    Lati: String,
    ID_Device: String,
},
    {
        collection: 'user_dbs'
    // user: {
    //     mobile: {
    //         type: String,
    //         //required: true
    //     },
    //     name: {
    //         type: String,
    //        // required: true
    //     },
    //     address: String,
    //     created: { 
    //         type: Date,
    //         default: Date.now
    //     }
    // },
    // pwd: {
    //     type: String,
    //    // required: true
    // },
    // device: {
    //     ID_device: {
    //       type: String,
    //     //  required: true  
    //     },
    //     Lon: {
    //       type: String,
    //      // required: true
    //     },
    //     Lati: {
    //       type: String,
    //      // required: true
    //     },
    //     IP: {
    //       type: String,
    //     },
    // },
});

UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const User = module.exports = mongoose.model('user', UserSchema);
  
