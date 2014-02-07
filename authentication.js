var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy
	, TwitterStrategy = require('passport-twitter').Strategy
	, GoogleStrategy = require('passport-google').Strategy;
var config = require('./oauth.js');
var User = require('./models/user.js');

module.exports = passport.use(new FacebookStrategy({
  clientID: config.facebook.clientID,
  clientSecret: config.facebook.clientSecret,
  callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
	User.findOne({ oauthID: profile.id }, function(err, user) {
	if(err) { console.log(err); }
	if (!err && user != null) {
	  done(null, user);
	} else {
	  var user = new User({
	    oauthID: profile.id,
	    name: profile.displayName,
	    email: profile.emails[0].value,
	    created: Date.now()
	  });
	  user.save(function(err) {
	    if(err) {
	      console.log(err);
	    } else {
	      done(null, user);
	    };
	  });
	};
	});
	}
));
passport.use(new TwitterStrategy({
 consumerKey: config.twitter.consumerKey,
 consumerSecret: config.twitter.consumerSecret,
 callbackURL: config.twitter.callbackURL
},
function(token, tokenSecret, profile, done) {
User.findOne({ oauthID: profile.id }, function(err, user) {
 if(err) { console.log(err); }
 if (!err && user != null) {
   done(null, user);
 } else {
   var user = new User({
     oauthID: profile.id,
     name: profile.displayName,
     email: profile.emails,
     created: Date.now()
   });
   user.save(function(err) {
     if(err) {
       console.log(err);
     } else {
       done(null, user);
     };
   });
 };
});
}
));
passport.use(new GoogleStrategy({
 returnURL: config.google.returnURL,
 realm: config.google.realm
},
function(identifier, profile, done) {
User.findOne({ oauthID: profile.id }, function(err, user) {
 if(err) { console.log(err); }
 if (!err && user != null) {
   done(null, user);
 } else {
   var user = new User({
     oauthID: profile..emails[0].value,  //not sure google profile.id
     name: profile.displayName,
     email: profile.emails[0].value,
     created: Date.now()
   });
   user.save(function(err) {
     if(err) {
       console.log(err);
     } else {
      console.log("user.oauthID..." + "   "+user.oauthID);
      console.log("user.name..." + "   "+user.name);
       done(null, user);
     };
   });
 };
});
}
));