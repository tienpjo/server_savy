const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    username: {type:String,required:true},
    hash: {type:String,required:true},
    firstName:{type: String,required:true},
    lastName: {type:String,required:true},
    mobile: {type:String,unique:true,required:true},
    address: {type:String,required:true},
},
    {
        collection: 'user_dbs'
    
});
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
UserSchema.set('toJSON',{virtuals: true});
module.exports = mongoose.model('User',UserSchema);