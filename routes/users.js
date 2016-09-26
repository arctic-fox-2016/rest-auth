'use-strict'
let express = require('express')
let router = express.Router()
let model = require('../models/index')
let bodyParser = require('body-parser')
let jwt = require('jsonwebtoken')
let app = express()

router.use(bodyParser.urlencoded({extended:true}))

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
