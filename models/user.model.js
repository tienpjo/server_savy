const mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },                      // user cần khai báo tên
    mobile: { type: String, unique: true, required: true },      // số đt
    hash: { type: String, required: true },                      // mật khẩu sau khi hash
    role: { type: String },
    createdDate: { type: Number, default: Date.now },   // Thời gian tạo tài khoản
    expiredDate: Number,                                // Thời gian hết hạn
    storeInfo: {
        addr: String,                                   // Địa chỉ
        ward: String,
        district: String,
        city: String
    },
    hashDecode:{type:String}
},
    {
        collection: 'user_dbs'

    });
UserSchema.plugin(unique, { message: 'That {PATH} is already taken.' });
UserSchema.set('toJSON', { virtuals: true });
const User = module.exports = mongoose.model('User', UserSchema);