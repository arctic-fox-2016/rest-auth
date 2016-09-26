let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let modelUser = require('./models/index');
let routes = require('./routes/user.js')
let jwt = require('jsonwebtoken')
var model = require("./models/index")


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');

app.get('/', function(req, res, next) {
    res.json({
        message: "HelloW!"
    })

});

app.use('/api', function(req, res, next) {
    if (req.body.token != null) {
        jwt.verify(req.body.token, 'apaajahyeah', function(err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate token'
                })
            } else {
                req.decoded = decoded
                res.send(req.decoded)
            }
        })
    } else {
        res.json({
            success: false,
            message: 'No token provided'
        })
    }
})

app.use('/api', routes)


app.post("/authenticate", function(req, res, next) {
    model.User.findAll({
        where: {
            username: req.body.username,
            password: req.body.password
        }
    }).then(function(result) {
        console.log(result);
        if (result.length >= 1) {
            var token = jwt.sign({
                username: req.body.username
            }, 'apaajahyeah')
            res.json(token)
        }
    })
});


app.listen(4000, function() {
    console.log('example app listenings port 3000!');

})
