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

router.get('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, result){
      res.json(result);
  });
});

router.get('/update/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, result) {
  if (!result)
    res.status(404).send("data is not found");
  else {
      result.Lon = req.body.Lon;
      business.Lati = req.body.Lati;

      result.save().then(result => {
        res.json('Update complete');
    })
    .catch(err => {
          res.status(400).send("unable to update the database");
    });
  }
});
});

router.get('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err, person){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

module.exports = router;