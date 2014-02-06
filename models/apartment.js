/** Event Schema for Apartment **/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var ApartmentSchema = new Schema({
	//prob. bad id like this ...fix later
     _someId: mongoose.Schema.Types.ObjectId
   , owner: String
   , phone: String
   , oauthID: String
   , photos: [] //photos.push();
   , neighborhood: String
   , price: Number
   , availiable: { type: Boolean, default: true }
   , address: { street: String, city: String, state: String, zipcode: String}
   , description: String
   , created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Apartment', ApartmentSchema);
