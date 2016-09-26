var express = require('express');
var router = express.Router();
var models = require('../models')
var expressJWT = require('express-jwt')
var jwt = require('jsonwebtoken')
	//
	// app.get('/protected',
	//   jwt({secret: 'shhhhhhared-secret'}),
	//   function(req, res) {
	//     if (!req.user.admin) return res.sendStatus(401);
	//     res.sendStatus(200);
	//   });


router.post("/authen", function (req, res, next) {
	models.users.findAll({
		where: {
			username: req.body.username,
			password: req.body.password
		}
	}).then(function (result) {
		if (result.length >= 1) {
			var token = jwt.sign({
				username: req.body.username,
				admin: true
			}, 'nyancat 4 ever')
			res.json(token)
		}
	})
});


// test for valid token
router.get('/protected',
	expressJWT({
		secret: 'nyancat 4 ever'
	}),
	(req, res) => {
		if (!req.user.username) {
			console.log(req.user);
			return res.sendStatus(401);
		}
		res.json(req.user)
	});

router.get('/ingredients',
	expressJWT({
		secret: 'nyancat 4 ever'
	}),
	(req, res, next) => {
		if (!req.user.username) {
			console.log(req.user);
			return res.sendStatus(401);
		}
		// only run this when token is valid
		models.Ingredients.findAll({
			order: 'name ASC'
		}).then(function (resultIngredients) {
			res.json(resultIngredients)
		})
	});

router.post('/ingredients', expressJWT({
	secret: 'nyancat 4 ever'
}), function (req, res, next) {
	if (!req.user.username) {
		models.Ingredients.create({
			name: req.body.ingredientname,
			isSelected: false,
			ingredientTypeId: 1
		}).then(function () {
			models.Ingredients.findAll({
				order: 'name ASC'
			}).then(function (resultIngredients) {
				res.json(resultIngredients)
			})
		});
	}
});

router.put('/ingredients/', expressJWT({
	secret: 'nyancat 4 ever'
}), function (req, res, next) {
	if (!req.user.username) {
		models.Ingredients.find({
			where: {
				id: req.body.id
			}
		}).then(function (result) {
			if (result) {
				result.updateAttributes({
					name: req.body.ingredientname,
					isSelected: req.body.isSelected,
					ingredientTypeId: req.body.ingredientTypeId
				}).then(function (result) {
					models.Ingredients.findAll({
						order: 'name ASC'
					}).then(function (resultIngredients) {
						res.json(resultIngredients)
					})
				})
			}
		})
	}
});

router.patch('/ingredients', expressJWT({
	secret: 'nyancat 4 ever'
}), function (req, res, next) {
	if (!req.user.username) {
		models.Ingredients.find({
			where: {
				id: req.body.id
			}
		}).then(function (result) {
			if (result) {
				result.updateAttributes({
					name: req.body.ingredientname,
				}).then(function (result) {
					models.Ingredients.findAll({
						order: 'name ASC'
					}).then(function (resultIngredients) {
						res.json(resultIngredients)
					})
				})
			}
		})
	}
});

router.delete('/ingredients', expressJWT({
	secret: 'nyancat 4 ever'
}), function (req, res, next) {
	if (!req.user.username) {
		models.Ingredients.destroy({
			where: {
				id: req.body.id
			}
		}).then(function () {
			models.Ingredients.findAll({
				order: 'name ASC'
			}).then(function (resultIngredients) {
				res.json(resultIngredients)
			})
		});
	}
});

router.get('/users', function (req, res, next) {
	models.users.findAll({
		order: 'name ASC'
	}).then(function (result) {
		res.json(result)
	})
})


router.post('/users', function (req, res, next) {
	models.users.create({
		name: req.body.name,
		username: req.body.username,
		password: req.body.password
	}).then(function () {
		models.users.findAll({
			order: 'name ASC'
		}).then(function (result) {
			res.json(result)
		})
	});
})

router.delete('/users', function (req, res, next) {
	models.users.destroy({
		where: {
			id: req.body.id
		}
	}).then(function () {
		models.users.findAll({
			order: 'name ASC'
		}).then(function (result) {
			res.json(result)
		})
	});
});

module.exports = router;
