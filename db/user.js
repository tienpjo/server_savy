var mongoClient = require('mongodb').MongoClient;
var user_dbo = mongoClient.Schema({
    _id: mongoClient.Schema.Types.ObjectId,
    name : String,
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
          type: mongoClient.Decimal128,
         // required: true
        },
        Lati: {
          type: mongoClient.Decimal128,
         // required: true
        },
        time: {
          type: Date,
        },
    },
});
var user = mongoClient.model('user', user_dbo);
  
module.exports = user;