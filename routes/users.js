var express = require('express');
var router = express.Router();
var models = require('../models')

var jwt = require('jsonwebtoken')
var expressJWT = require('express-jwt')

router.get('/authenticate', function(req, res, next) {
  models.users.find({
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
        var token = jwt.sign(user.dataValues, "test")

        // return the information including token as JSON
        res.json(token)
      }
    }
  })
})

router.get('/users', expressJWT({ secret: "test" }), function(req, res, next) {

  if (!req.user.username) {
    console.log(req.user);
    return res.sendStatus(401);
  }

  models.users.findAll({}).then(function(data) {
    res.json(data)
  })
})

router.post('/users', expressJWT({ secret: "test" }), function(req, res, next) {

  if (!req.user.username) {
    console.log(req.user);
    return res.sendStatus(401);
  }

  models.users.create({
    username: req.body.username,
    password: req.body.password
  }).then(function(data) {
    res.json(data)
  })
})

router.put('/users/:id', expressJWT({ secret: "test" }), function(req, res, next) {

  if (!req.user.username) {
    console.log(req.user);
    return res.sendStatus(401);
  }

  models.users.find({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    if(data){
      data.updateAttributes({
        username: req.body.username,
        password: req.body.password
      }).then(function(data) {
        res.json(data)
      })
    }
  })
})

router.patch('/users/:id', expressJWT({ secret: "test" }), function(req, res, next) {

  if (!req.user.username) {
    console.log(req.user);
    return res.sendStatus(401);
  }

  models.users.find({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    if(data){
      data.updateAttributes({
        username : req.body.username,
        password : req.body.password
      }).then(function(data) {
        res.json(data)
      })
    }
  })
})

router.delete('/users/:id', expressJWT({ secret: "test" }), function(req, res, next) {

  if (!req.user.username) {
    console.log(req.user);
    return res.sendStatus(401);
  }

  models.users.destroy({
    where: {
      id: req.params.id
    }
  }).then(function(data) {
    res.json(data)
  })
})

module.exports = router;
