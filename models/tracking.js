var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const TrackingSchema = new mongoose.Schema({
    deviceId: {type: Array,required:true},
    long: {type: Number,required:true},         // kinh độ
    lati: {type: Number, required:true},        // vĩ độ
    bat: {type:String},
    status:{type:String},                       // trạng thái hiện tại của sẽ là ON or OFF
    createdAt:{type:Date, expires: 1296000},                      // thời gian lưu track vào mongo, auto delete sau ..gio
    move:{type:String}                          // lưu sẽ đang di chuyển hay là ko di chuyển, xe đang OFF vẫn có thể di chuyển đc? vì sensor
},
    {
        collection: 'tracking_dbs'
});

TrackingSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Tracking = module.exports = mongoose.model('tracking', TrackingSchema);
  
