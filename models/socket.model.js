var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const SocketSchema = new mongoose.Schema({
    id_device: {type: Number,required:true},
    hw_connect: {type: String,required:true}
},
    {
        collection: 'socket_dbs'
});

SocketSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Socket = module.exports = mongoose.model('device', SocketSchema);
  
