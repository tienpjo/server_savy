const dbs = require('../_helpers/database');
const sttService = require('../../_service/hwConnect.service')

module.exports={
    // updateSttServer
}

function updateSttServer(id,sttParam){
    sttService.updateSttServer(id,sttParam)
}