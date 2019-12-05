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

router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// UPDATE
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, person) {
      if (!person)
          res.status(404).send("data is not found");
      else {
          console.log(person);
          person.Lon = req.body.Lon;
          person.Lati = req.body.Lati;
          person.ID_Device = req.body.ID_Device;

          person.save().then(business => {
              res.json('Update complete');
          })
              .catch(err => {
                  res.status(400).send("unable to update the database");
              });
      }
  });
});

router.route('/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({_id: req.params.id}, function(err, person){
      if(err) res.json(err);
      else res.json('Successfully removed');
  });
});

module.exports = router;