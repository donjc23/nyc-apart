// Module dependencies
var mongoose = require('mongoose')
	, Apart = require('./models/apartment');



module.exports = {

	connectDB: function(uristring) {
	    //connecting...
		mongoose.connect(uristring, function (err, res) {
			if (err) { 
		  		console.log ('ERROR connecting to: ' + uristring + '. ' + err);
		  	} else {
		  		console.log ('Succeeded connected to: ' + uristring);
		  	}
		});

  	},

  	//get all apartments
  	getApartments: function(callback) {
    	Apart.find({}, function(err, docs) {
      		callback(null, docs);
    	});
  	},

    //search all apartments by city
    getApartmentsByCity: function(city, callback) {
      Apart.find({ 'address.city': city }, function(err, docs) {
          callback(null, docs);
      });
    },
	//create n save the new apartment
  	saveApartment: function(info, callback) {
	    new Apart({
	      // id and _id are same, auto-generated,
	      //photo: [images/xxx],
	      _someId: info._someId,
	      owner: info.owner,
	      phone: info.phone,
        oauthID: info.oauthID,
	      price: info.price,
	      neighborhood: info.neighborhood,
	      description: info.description,
	      address: {street: info.street, city: info.city, 
              state: info.state, zipcode: info.zipcode} 
	    }).save(function(err, docs){
	      if (err) res.json(err)
        console.dir(docs)  
	      callback(null, docs);
    	});
  	},

    //get user apartment by oauthid
    
    findUserApartment: function(oauthid, callback) {
      Apart.find({ oauthID: oauthid }, function(err, docs) {
        callback(null, docs);
      });
    },

  	//get one apartment by id
  	getApartment: function(id, callback) {
    	Apart.find({ _someId: id }, function(err, docs) {
        callback(null, docs);
    	});
  	},

  	//update the apartment by id
  	updateApartment: function(info, callback) {
  		Apart.update(
      		{ _someId: info._someId },
      		{   owner: info.owner, 
      			phone: info.phone,
      			price: info.price,
      			neighborhood: info.neighborhood,
      			description: info.description,
      			address: {street: info.street, city: info.city, 
      				state: info.state, zipcode: info.zipcode} 
      		}, function(err){
        		callback(null);
      			}
      	);
  	},

  	//delete the apartment by id
  	removeApartment: function(id, callback) {
  		Apart.remove(
  			{ _someId: id }, function(err){
        		callback(null);
      		}
  		);
  	}

}