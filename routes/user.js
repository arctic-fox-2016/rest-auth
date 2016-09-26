var express = require('express')
var router = express.Router()
var model = require("../models/index")

var jwt = require('jsonwebtoken')

router.get('/users', function(req, res, next) {
    model.User.findAll().then(function(result) {

        res.json(result)
    })

});


router.get('/users/:id', function(req, res, next) {
    model.User.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        res.json(result)
    })

});

router.post('/users', function(req, res, next) {
    model.User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    }).then(function(result) {
        res.json(result)
    })
})

router.delete('/users/:id', function(req, res) {
    model.User.destroy({
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        model.User.findAll().then(function(result) {
            res.json(result)
        })
    })
})



router.put('/users/:id', function(req, res) {
    model.User.update({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        role: req.body.role
    }, {
        where: {
            id: req.params.id
        }
    }).then(function(result) {
        model.User.findAll({
            where: {
                id: req.params.id
            }
        }).then(function(result) {
            res.json(result)
        })
    })
})


module.exports = router;
