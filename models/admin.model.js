const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    username:{type: String,required:true},                      // user cần khai báo tên
    password: {type:String,unique:true,required:true},        // số đt
},
    {
        collection: 'admin_dbs'
    
});
AdminSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
AdminSchema.set('toJSON',{virtuals: true});
const Admin = module.exports = mongoose.model('Admin',UserSchema);