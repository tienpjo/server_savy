const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const hwConnectSchema = new mongoose.Schema({
    deviceId:{type: String,required:true},                      // 
    sockConnect:{type:Array,require: true}        // 
},
    {
        collection: 'hwConnect_dbs'
    
});
hwConnectSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
hwConnectSchema.set('toJSON',{virtuals: true});
const hwConnect = module.exports = mongoose.model('HwConnect',hwConnectSchema);