var express = require('express');
var router = express.Router();
var model = require("../models/index");
var jwt = require('jsonwebtoken');
var expressJWT = require('express-jwt')

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/authenticate', function(req, res, next) {
  model.Users.findAll({
    where: {
      username: req.body.username,
      password: req.body.password
    }
  }).then(function(user) {
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' })
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user.dataValues, "inidiakuncimasalahanda")

        // return the information including token as JSON
        res.json(token)
      }
    }
  })
})


router.post('/api/users', function(req, res, next) {
  model.Users.create({
    username: req.body.username,
    password: req.body.password,
    bio: req.body.bio
  }).then(function(users){
    res.json(users)
  })
});


router.get('/api/users', expressJWT({ secret: "inidiakuncimasalahanda" }), function(req, res, next) {

  if (!req.user.username) {
    console.log(req.user);
    return res.sendStatus(401);
  }

  models.Users.findAll({}).then(function(data) {
    res.json(data)
  })
})

router.delete('/api/users/:id', function(req, res, next) {
  model.Users.destroy({
    where:{
      id:req.params.id
    }
  }).then(function(users){
    res.json(users)
  })
});

router.put('/api/users/:id', function(req, res, next) {
  model.Users.find({
    where:{
      id:req.params.id
    }
  }).then(function(users){
    if(users){
      users.updateAttributes({
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio
      }).then(function(users){
          res.json(users)
      })
    }
  })
});

router.patch('/api/users/:id', function(req, res, next) {
  model.Users.find({
    where:{
      id:req.params.id
    }
  }).then(function(users){
    if(users){
      users.updateAttributes({
        username: req.body.username,
        password: req.body.password,
        bio: req.body.bio
      }).then(function(users){
          res.json(users)
      })
    }
  })
});

module.exports = router;
