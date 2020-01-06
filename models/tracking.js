var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const TrackingSchema = new mongoose.Schema({
    deviceId: [{type: Array,required:true}],
    long: {type: String,required:true},
    lati: {type: String, required:true},
    bat: {type:String},
    date: {type:Date,required:true}
},
    {
        collection: 'tracking_dbs'
});

TrackingSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Tracking = module.exports = mongoose.model('tracking', TrackingSchema);
  
