const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const deviceService = require('../_service/device.service');

// module.exports = add_device;

// --------------------------GPS -DEVICE----------------------------
// router.get('/', (req, res) => {
//   Device.find({}).lean()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
//     });
// });

// router.get('/find/:id', (req, res) => {
//   Device.findById(req.params.id)
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.status(404).json({ success: false, msg: `No such user.` });
//     });
// });

// // UPDATE
// router.route('/edit/:id').get(function (req, res) {
//   let id = req.params.id;
//   console.log(id);
//   Device.find({ ID_Device: id }, function (err, business) {
//     res.json(business);
//   });
// });

// //  Defined update route
// router.route('/update/:id').post(function (req, res) {
//   Device.findById(req.params.id, function (err, device) {
//     if (!device)
//       res.status(404).send("data is not found");
//     else {
//       console.log(person);
//       device.Lon = req.body.Lon;
//       device.Lati = req.body.Lati;
//       device.ID_Device = req.body.ID_Device;
//       device.save().then(business => {
//         res.json('Update complete');
//       })
//         .catch(err => {
//           res.status(400).send("unable to update the database");
//         });
//     }
//   });
// });

// router.route('/delete/:id').get(function (req, res) {
//   Device.findByIdAndRemove({ _id: req.params.id }, function (err, person) {
//     if (err) res.json(err);
//     else res.json('Successfully removed');
//   });
// });

router.route('/add').post(function (req, res) {
  deviceService.create(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}

// --------------------------USER - LOGIN----------------------------
// get toan bo nguoi dung
// router.get('/', (req, res) => {
//   User_Login.find({}).lean()
//     .then((result) => {
//       res.json(result);
//     })
//     .catch((err) => {
//       res.status(500).json({ success: false, msg: `Something went wrong. ${err}` });
//     });
// });

// // update nguoi dung 

// router.post('/user_edit', function (req, res, result) {
//   if (req.body.password !== req.body.passwordConf) {
//     var err = new Error('Passwords do not match.');
//     err.status = 400;
//     res.send("Passwords don't not match");
//     return result(err);
//   }
//   if (req.body.mobi &&
//     req.body.username &&
//     req.body.password &&
//     req.body.passwordConf &&
//     req.body.ID_Device) {
//     var userData = {
//       mobi = req.body.mobi,
//       username = req.body.username,
//       password = req.body.password,
//       ID_Device = req.body.ID_Device
//     }
//     User_Login.create(userData, function (error, user) {
//       if (error) {
//         return result(error);
//       } else {
//         // ID_Device = id;
//         return res.redirect('/edit/:ID_Device');
//       }
//     });
//   }
//   else {
//     var err = new Error('All fields required');
//     err.status = 400;
//     return result(err);
//   }
// })

// router.get('user_logout', function (req, res, result) {
//   if (req.session) {
//     req.session.destroy(function (err) {
//       if (err) {
//         return result(err);
//       }
//       else {
//         return res.redirect('/');
//       }
//     })
//   }
// })

module.exports = router;