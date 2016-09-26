'use-strict'
let express = require('express')
let app = express()
let routes = require('./routes/users.js')
let jwt = require('jsonwebtoken')
let bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true}))
app.set('port', (process.env.PORT || 5000));
app.set('superSecret', 'yeah')

app.use('/api',function(req,res,next){
  if(req.body.token != null){
    jwt.verify(req.body.token,'yeah', function(err,decoded){
      if(err){
        res.json({success: false, message: 'Failed to authenticate token'})
      } else {
        req.decoded = decoded
        res.send(req.decoded)
      }
    })
  } else {
    res.json({success: false, message: 'No token provided'})
  }
})

app.use('/api', routes)

app.get('/', function(req,res,next){
  res.send('welcome')
})


app.post('/authenticate', function(req,res,next){
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

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



module.exports = app
