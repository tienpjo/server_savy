var mongoose = require('mongoose');
const unique = require('mongoose-unique-validator');

const SocketSchema = new mongoose.Schema({
    deviceId: [{type: Array,required:true}],
    hw_connect: [{type: Array,required:true}]
},
    {
        collection: 'socket_dbs'
});

SocketSchema.plugin(unique, { message: 'That {PATH} is already taken.' });

const Socket = module.exports = mongoose.model('socket', SocketSchema);
  
