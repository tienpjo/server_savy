const express = require('express');
const router = express.Router();
const deviceService = require('../_service/device.service');

module.exports ={ 
    add
};

function add (req, res, next) {
    console.log(req.jwtDecoded.sub._id);
    deviceService.addDevice(req.jwtDecoded.sub._id,req.body)
    .then(() => res.json({}))
    .catch(err => next(err));
};
