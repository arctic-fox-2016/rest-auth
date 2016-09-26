'use-strict'
let express = require('express')
let router = express.Router()
let model = require('../models/index')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
let app = express()

router.use(bodyParser.urlencoded({extended:true}))

router.post('/users/authenticate', function(req,res,next){
  model.admin.findAll({where:{username: req.body.username}}).then(function(result){
    if(result.length<1){
      res.json({success:false, message: 'Authetication failed. User not found'})
    } else {
      if (result[0].password == req.body.password){
        let token = jwt.sign(result[0].dataValues, 'yeah', {expiresIn: "10h"})
        res.json({success: true, message: 'Authentication is successful', token: token})
      } else {
        res.json({success: false, message: 'Authentication failed. Password does not match'})
      }
    }
  })
})

router.post('/go',function(req,res,next){
  jwt.verify(req.body.token,'yeah', function(err,decoded){
    if(err){
      res.json({success: false, message: 'Failed to authenticate token'})
    } else {
      req.decoded = decoded
      res.send(req.decoded)
    }
  })
})

router.get('/users', function(req,res,next){
  model.admin.findAll().then(function(result){
    res.json(result)
  })
})

router.get('/users/:id', function(req,res,next){
  model.admin.findAll({where: {id: req.params.id}}).then(function(result){
    res.json(result)
  })
})

router.post('/users', function(req,res,next){
  model.admin.create({username: req.body.username, password: req.body.password, email: req.body.email}).then(function(result){
    res.json(result)
  })
})

router.delete('/users/:id', function(req,res,next){
  model.admin.destroy({where:{id: req.params.id}}).then(function(result){
    res.json(result)
  })
})

router.put('/users/:id', function(req,res,next){
  model.admin.update({username: req.body.username, password: req.body.password, email: req.body.email},{where:{id: req.params.id}}).then(function(result){
    res.json(result)
  })
})

router.patch('/users/:id', function(req,res,next){
  model.admin.update({username: req.body.username, password: req.body.password, email: req.body.email},{where:{id: req.params.id}}).then(function(result){
    res.json(result)
  })
})



module.exports = router
