var mongoose = require('mongoose');
var user_dbo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: {
        mobile: {
            type: String,
            //required: true
        },
        name: {
            type: String,
           // required: true
        },
        address: String,
        created: { 
            type: Date,
            default: Date.now
        }
    },
    pwd: {
        type: String,
       // required: true
    },
    device: {
        ID_device: {
          type: String,
        //  required: true  
        },
        Lon: {
          type: mongoose.Decimal128,
          required: true
        },
        Lati: {
          type: mongoose.Decimal128,
          required: true
        },
        time: {
          type: Date,
         // required: true
        },
    },
});
var user = mongoose.model('user', user_dbo);
  
module.exports = user;