'use-strict'
let express = require('express')
let app = express()
let routes = require('./routes/users.js')

app.set('port', (process.env.PORT || 5000));
app.set('superSecret', 'yeah')
app.use('/api', routes)

app.get('/', function(req,res,next){
  res.send('welcome')
})

app.use('/api',function(req,res,next){
  
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});



module.exports = app
