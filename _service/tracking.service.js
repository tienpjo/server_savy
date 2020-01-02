var mongoClient = require('mongoose');
const tracking = require('../models/tracking');
const LocalStrategy = require('passport-local').Strategy;
const dbs = require('../_helpers/database');
const Tracking = dbs.Tracking;
const Device = dbs.Device;

module.exports = find_tracking_device;



