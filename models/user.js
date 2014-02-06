var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define schema
var User = new Schema({
  oauthID: String,
  name: String,
  email: String,
  created: { type: Date, default: Date.now }
});
// create a user model



module.exports = mongoose.model('User', User);