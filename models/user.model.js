const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    name:{type: String,required:true},
    mobile: {type:String,unique:true,required:true},
    hash: {type:String,required:true},
    // address: {type:String,required:true},
    id_token:{type:String},
},
    {
        collection: 'user_dbs'
    
});
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
UserSchema.set('toJSON',{virtuals: true});
const User = module.exports = mongoose.model('User',UserSchema);