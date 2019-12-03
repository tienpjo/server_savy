let mongoose = require('mongoose'),
    express = require('express'),
    businessRoutes = express.Router();

let user = require('./user.model');

businessRoutes.route('/add').post(function (req, res) {
    let business = new user(req.body);
    business.save()
      .then(business => {
        res.status(200).json({'business': 'business in added successfully'});
      })
      .catch(err => {
      res.status(400).send("unable to save to database");
      });
  });
  
  // Defined get data(index or listing) route
  businessRoutes.route('/').get(function (req, res) {
      user.find(function(err, businesses){
      if(err){
        console.log(err);
      }
      else {
        res.json(businesses);
      }
    });
  });
  
  // Defined edit route
  businessRoutes.route('/edit/:id').get(function (req, res) {
    let id = req.params.id;
    user.findById(id, function (err, business){
        res.json(business);
    });
  });
  
  //  Defined update route
  businessRoutes.route('/update/:id').post(function (req, res) {
      user.findById(req.params.id, function(err, business) {
      if (!business)
        res.status(404).send("data is not found");
      else {
          business.person_name = req.body.person_name;
          business.business_name = req.body.business_name;
          business.business_gst_number = req.body.business_gst_number;
  
          business.save().then(business => {
            res.json('Update complete');
        })
        .catch(err => {
              res.status(400).send("unable to update the database");
        });
      }
    });
  });
  
  // Defined delete | remove | destroy route
  businessRoutes.route('/delete/:id').get(function (req, res) {
      user.findByIdAndRemove({_id: req.params.id}, function(err, business){
          if(err) res.json(err);
          else res.json('Successfully removed');
      });
  });
module.exports = businessRoutes;