const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const User = require('../models/device.model');
const User_Login = require('../app/users_controller')

// --------------------------GPS -DEVICE----------------------------
router.get('/', (req, res) => {
  User.find({}).lean()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

router.get('device/find/:id', (req, res) => {
  User.findById(req.params.id)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(404).json({ success: false, msg: `No such user.` });
    });
});

// UPDATE
router.route('device/edit/:id').get(function (req, res) {
  let id = req.params.id;
  console.log(id);
  User.find({ ID_Device: id }, function (err, business) {
    res.json(business);
  });
});

//  Defined update route
router.route('device/update/:id').post(function (req, res) {
  User.findById(req.params.id, function (err, person) {
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

router.route('device/delete/:id').get(function (req, res) {
  User.findByIdAndRemove({ _id: req.params.id }, function (err, person) {
    if (err) res.json(err);
    else res.json('Successfully removed');
  });
});


// --------------------------USER - LOGIN----------------------------
// get toan bo nguoi dung
router.get('/', (req, res) => {
  User_Login.find({}).lean()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
    });
});

// update nguoi dung 

router.post('/user_edit', function (req, res, result) {
  if (req.body.password !== req.body.passwordConf) {
    var err = new Error('Passwords do not match.');
    err.status = 400;
    res.send("Passwords don't not match");
    return result(err);
  }
  if (req.body.mobi &&
    req.body.username &&
    req.body.password &&
    req.body.passwordConf &&
    req.body.ID_Device) {
    var userData = {
      mobi = req.body.mobi,
      username = req.body.username,
      password = req.body.password,
      ID_Device = req.body.ID_Device
    }
    User_Login.create(userData, function (error, user) {
      if (error) {
        return result(error);
      } else {
        // ID_Device = id;
        return res.redirect('device/edit/:ID_Device');
      }
    });
  }
  else {
    var err = new Error('All fields required');
    err.status = 400;
    return result(err);
  }
})

router.get('user_logout', function (req, res, result) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return result(err);
      }
      else {
        return res.redirect('/');
      }
    })
  }
})

module.exports = router;