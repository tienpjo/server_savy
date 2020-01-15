var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const TrackingSchema = new mongoose.Schema({
    deviceId: {type: Array,required:true},
    long: {type: Number,required:true},
    lati: {type: Number, required:true},
    bat: {type:String},
    status:{type:String},
},
    {
        collection: 'tracking_dbs'
});

TrackingSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Tracking = module.exports = mongoose.model('tracking', TrackingSchema);
  
