/**
  * Module dependencies.
  */
var db = require('../accessDB')
	, mongoose = require('mongoose');
var User = require('../models/user.js');

module.exports = {
	// app.get('/apartments')
  	getAllApartments: function(req, res) {
      User.findById(req.session.passport.user, function(err, user) {
  		db.getApartments(function(err, docs) {
  			res.render('apartment/allAprts'
  				, { title: 'all apartments', user: user, aprts: docs}
  			);
  		})
      });  
  	},

	// app.get('/apartments/new')
  	newApartment: function(req, res) {
      //find user n aprtm
      User.findById(req.session.passport.user, function(err, user) {
        db.findUserApartment(user.oauthID, function(err, docs){
          res.render('apartment/new'
          , { title: 'apartment info.', user: user, aprts: docs}
        );
      });
      });  
  	},
	
	// app.post('/apartments/new')
  	postApartment: function(req, res) {
      
  		var b = req.body;
      User.findById(req.session.passport.user, function(err, user) {
  		db.saveApartment(
  			{
			    // id and _id are same, auto-generated,
			    //photo: [images/xxx],
			    _someId: new mongoose.Types.ObjectId,
			    owner: b.owner,
          oauthID: user.oauthID,
			    phone: b.phone,
			    price: b.price,
			    neighborhood: b.neighborhood,
			    description: b.description,
			    street: b.street, city: b.city, state: b.state, zipcode: b.zipcode
		    }, function(err,docs) {
	      		res.redirect('/apartments/new');
    		}
    	);
    });
  	},

  	// app.get('/apartments/:id')
  	getOneApartment: function(req, res) {
      User.findById(req.session.passport.user, function(err, user) {
  		db.getApartment(req.param('id'), function(err, docs) {
  			res.render('apartment/oneApart'
  				, { aprt: docs[0], user: user});
    	})
    });
  	},

  	// app.get('/apartments/:id/edit')
  	editApartment: function(req, res) {
  		db.getApartment(req.params.id, function(err, docs) {
  			res.render('apartment/edit'
  				, { aprt: docs[0] });
    	})
  	},

  	// app.put('/apartments/:id')
  	putApartment: function(req, res) {
  		var b = req.body;
  		db.updateApartment(
	  		{
	  			_someId: req.params.id,
				owner: b.owner,
				phone: b.phone,
				price: b.price,
				neighborhood: b.neighborhood,
				description: b.description,
				street: b.street, city: b.city, state: b.state, zipcode: b.zipcode
	  		}, function(err) {
		      		res.redirect('/apartments/' + req.params.id);
	    		}
    	)
  	},

    // app.get('/apartments/:city')
    searchApartment: function(req, res) {
      User.findById(req.session.passport.user, function(err, user) {
      db.getApartmentsByCity(req.param('city'), function(err, docs) {
        res.render('apartment/allAprts', 
          { aprts: docs, user: user }
        );
      })
      });
    },
  	// app.delete('/apartments/:id')
  	deleteApartment: function(req, res) {
  		db.removeApartment(req.params.id, function(err) {
		      		res.redirect('/apartments/');
	    		}
  		)
  	}


}