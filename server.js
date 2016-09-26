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
app.set('superSecret', config.secret) //secret variable

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev')) //use morgan to log requests to console

//routes
router.get('/', function(req,res) {
	res.send('Ini API nya!')
})

router.get('/seed', function(req,res) {
	var datas = [
	{name: 'tevinstein', password: 'tevinstein', email: 'tevinstein@tevinstein.com'},
	{name: 'sahbana', password: 'sahbana', email: 'sahbana@sahbana.com'},
	{name: 'digachandra', password: 'digachandra', email: 'digachandra@digachandra.com'}
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
		data.species = req.body.species

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
			data.species = req.body.species

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

