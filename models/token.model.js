var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');
const TokenSchema = new mongoose.Schema({
    id_own: {type: Number,required:true},
    token: {type: String,required:true},
},
    {
        collection: 'token_dbs'
});

TokenSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

module.exports = mongoose.model('token', TokenSchema);