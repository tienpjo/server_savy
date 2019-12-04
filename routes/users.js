const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/user.model');

router.get('/', (req, res) => {
  User.find({}).lean()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

module.exports = router;