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


// UPDATE
router.put('/:id', (req, res) => {

  let updatedUser = {
    Lon: sanitizeName(req.body.Lon),
    Lati: sanitizeEmail(req.body.Lati),
    ID_Device: sanitizeAge(req.body.ID_Device),
  };

  User.findOneAndUpdate({ _id: req.params.id }, updatedUser, { runValidators: true, context: 'query' })
    .then((oldResult) => {
      User.findOne({ _id: req.params.id })
        .then((newResult) => {
          res.json({
            success: true,
            msg: `Successfully updated!`,
            result: {
              _id: newResult._id,
              Lon: newResult.Lon,
              Lati: newResult.Lati,
              ID_Device: newResult.ID_Device
            }
          });
        })
        .catch((err) => {
          res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
          return;
        });
    })
    .catch((err) => {
      if (err.errors) {
        if (err.errors.Lon) {
          res.status(400).json({ success: false, msg: err.errors.Lon.message });
          return;
        }
        if (err.errors.Lati) {
          res.status(400).json({ success: false, msg: err.errors.Lati.message });
          return;
        }
        if (err.errors.IP) {
          res.status(400).json({ success: false, msg: err.errors.IP.message });
          return;
        }
        res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
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