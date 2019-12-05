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

// UPDATE
router.route('/edit/:id').get(function (req, res) {
  let id = req.params.id;
  User.findById(id, function (err, business){
      res.json(business);
  });
});

//  Defined update route
router.route('/update/:id').post(function (req, res) {
  User.findById(req.params.id, function(err, user) {
      if (!user)
          res.status(404).send("data is not found");
      else {
          console.log(user);
          user.Lon = req.body.Lon;
          user.Lati = req.body.Lati;
          user.IP = req.body.IP;

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