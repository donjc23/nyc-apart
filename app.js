
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , http = require('http')
  , path = require('path');
 

//new-----------------------------------
var fs = require('fs');
var config = require('./oauth.js');
var User = require('./models/user.js')
var passport = require('passport');
//var FacebookStrategy = require('passport-facebook').Strategy;
var auth = require('./authentication.js'); 
//-------------------------------------------------


// config

/////////////////////////////////////////////////////////////

var app = express();
var DB = require('./accessDB');
	// all environments
app.configure(function() {
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.session({ secret: 'my_precious' }));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(app.router);
	app.use(require('stylus').middleware(__dirname + '/public'));
	app.use(express.static(path.join(__dirname, 'public')));
});

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user){
    if(!err) done(null, user);
    else done(err, null)
 })
});
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}
// heroku db or localhost if we don't find one.  
/*var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 
	'mongodb://localhost/nyc';
*/
var mongoUri = process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://localhost/nyc';
//connect db
//var db = new DB.connectDB(uristring);
if ('development' == app.get('env')){
  DB.connectDB(mongoUri);
}else{
	DB.connectHDB(mongoUri);
}

//////////////////////////////////////////////

///////////////////////////////////////////////////////////
// Routes
require('./routes')(app);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

