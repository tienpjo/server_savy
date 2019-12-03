var mongoClient = require('mongoose');
let user_dbo = new mongoClient.Schema({
    _id: mongoClient.Types.ObjectId,
    name : String,
    Lon: String,
    Lati: String,
    IP: String,
},
    {
        collection: 'user_dbs'
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
module.exports = mongoClient.model('user_dbo', user_dbo);
  
