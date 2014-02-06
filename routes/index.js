/**
  * Module dependencies.
  */
var db = require('../accessDB');

module.exports = {
	// app.get('/'...)
  	index: function(req, res) {
    	res.render('index',
    		{ title: 'Nyc' }
    	);
  	},
	login: function(req, res) {
	    	res.render('login',
	    		{ title: 'login' }
	    	);
	  	}

}