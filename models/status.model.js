var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const StatusSchema = new mongoose.Schema({
    deviceId: { type: Array, required: true },
    sttGPS:{type:String},
    sttConnect:{type:String}
},
{
    collection: 'status_dbs'
});

StatusSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Status = module.exports = mongoose.model('status', StatusSchema);