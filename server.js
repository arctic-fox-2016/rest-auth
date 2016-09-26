//grab all dependencies
var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	router = express.Router(),
	port = process.env.PORT || 3000,
	mongoose = require('mongoose'),
	morgan = require('morgan'),
	Data = require('./app/models/datas'),
	jwt = require('jsonwebtoken'),
	config = require('./config')

//configure app
mongoose.connect(config.database) //setup database
app.set('secretku', config.secret) //secret variable

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev')) //use morgan to log requests to console

//routes
router.post('/authenticate', function(req,res){
	//find the user

	Data.findOne({name:req.body.name}, function(err,data) {

		if(err)
			res.send(err)

		if(!data){
			res.json({ success:false, message: 'Authentication failed. User not found!' })
		} else if (data){
			//check if password matches
			if(data.password != req.body.password) {
				res.json({ success:false, message: 'Authentication failed. Wrong pass!' })
			} else {
			//if user not found and password is right
			//create token
				var token = jwt.sign(data, app.get('secretku'), {
          			expiresIn : 60*60*24 // expires in 24 hours
        		})

				res.json({
					success: true,
					message: 'Enjoy your token',
					token: token
				})
			}
		}
	})
})

router.use(function(req,res,next){
	var token = req.body.token || req.query.token || req.headers['x-access-token']

	if(token) {
		//verifies secret and checks exp
		jwt.verify(token,app.get('secretku'), function(err, decoded){
			if(err){
				return res.json({ success: false, message: 'failed to authenticate token.'})
			} else {
				//if everything's good, save request for use in other routes
				req.decoded = decoded
				next()
			}
		})
	} else {
		//if there's no token
		//return an error
		return res.status(403).send({
			success: false,
			message: 'no token provided'
		})
	}
})

router.get('/', function(req,res) {
	res.send('Ini API nya!')
})

router.get('/seed', function(req,res) {
	var datas = [
	{name: 'tevinstein', password: 'tevinstein', admin: true},
	{name: 'sahbana', password: 'sahbana', admin: true},
	{name: 'digachandra', password: 'digachandra', admin: false}
	]

	Data.remove({}, () => {
		for(var i=0;i<datas.length;i++){
			var newData = new Data(datas[i])
			newData.save()
		}
	})

	res.send('Database seeded!')
})

router.route('/datas')

	.post(function(req,res){
		var data = new Data()
		data.name = req.body.name
		data.password = req.body.password
		data.admin = req.body.admin

		data.save(function(err){
			if(err)
				res.send(err)

			res.send('data berhasil dibuat!')
		})
	})

	.get(function(req,res){
		Data.find(function(err,datas){
			if(err)
				res.send(err)

			res.send(datas)
		})
	})

router.route('/datas/:id')

	.get(function(req,res){
		Data.findById(req.params.id, function(err, data){
			if(err)
				res.send(err)

			res.send(data)
		})
	})

	.put(function(req,res){
		Data.findById(req.params.id, function(err,data){
			if(err)
				res.send(err)

			data.name = req.body.name
			data.password = req.body.password
			data.admin = req.body.admin

			data.save(function(err){
				if(err)
					res.send(err)

				res.send('data berhasil diupdate!')
			})
		})
	})

	.delete(function(req,res){
		Data.remove({
			_id: req.params.id
		}, function(err, data){
			if(err)
				res.send(err)

			res.send('data berhasil didelete!')
		})
	})

//register routes to /api
app.use('/api',router) 

//start server
app.listen(port)
console.log('Ya udah jalan di port: ' + port)

