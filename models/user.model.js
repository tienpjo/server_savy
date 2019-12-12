const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema ({
    username: {type:String,unique:true,required:true},
    hash: {type:String,required:true},
    firstName:{type: String,required:true},
    lastName: {type:String,required:true},
    mobile: {type:String,required:true},
    address: {type:String,required:true},
    {
        collection: 'user_dbs'
    
});

UserSchema.set('toJSON',{virtuals: true});
module.exports = mongoose.model('User',UserSchema);