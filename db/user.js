var mongoClient = require('mongoose');
var user_dbo = mongoClient.Schema({
    _id: mongoClient.Types.ObjectId,
    name : String,
    Lon: String,
    Lati: String,
    IP: String
    // user: {
    //     mobile: {
    //         type: String,
    //         //required: true
    //     },
    //     name: {
    //         type: String,
    //        // required: true
    //     },
    //     address: String,
    //     created: { 
    //         type: Date,
    //         default: Date.now
    //     }
    // },
    // pwd: {
    //     type: String,
    //    // required: true
    // },
    // device: {
    //     ID_device: {
    //       type: String,
    //     //  required: true  
    //     },
    //     Lon: {
    //       type: String,
    //      // required: true
    //     },
    //     Lati: {
    //       type: String,
    //      // required: true
    //     },
    //     IP: {
    //       type: String,
    //     },
    // },
});
var user_db = mongoClient.model('user_db', user_dbo);
  
module.exports = user_db;