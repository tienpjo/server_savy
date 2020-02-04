const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    name:{type: String,required:true},                      // user cần khai báo tên
    mobile: {type:String,unique:true,required:true},        // số đt
    hash: {type:String,required:true},                      // mật khẩu sau khi hash
    //address: {type:String,required:true},  
},
    {
        collection: 'user_dbs'
    
});
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
UserSchema.set('toJSON',{virtuals: true});
const User = module.exports = mongoose.model('User',UserSchema);