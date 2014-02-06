/** routes.js
  */
var start = require('./routes/index')
	, apart = require('./routes/apartments');

/////////////////////////////////////////////////////////////
var User = require('./models/user.js');
var passport = require('passport');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
////////////////////////////////////////////////////////////////


module.exports = function(app) {

 	app.get('/', start.index);

 	

//////////////////////////////////////////////////////////////////////////
    app.get('/login', start.login);
    app.get('/apartments/new', ensureAuthenticated, apart.newApartment);
	/*
	app.get('/apartments/new', ensureAuthenticated, function(req, res){
	  User.findById(req.session.passport.user, function(err, user) {
		if(err) {
		  console.log(err);
		} else {
		  res.render('apartment/new', { user: user});
		};
	  });
	});
	*/

	app.get('/auth/facebook',
	  passport.authenticate('facebook', {scope: 'email'}));
	app.get('/auth/facebook/callback', 
	  passport.authenticate('facebook', { successRedirect: '/apartments/new',
	  	failureRedirect: '/login' }));

	app.get('/auth/twitter', 
	  passport.authenticate('twitter'));
	app.get('/auth/twitter/callback',
	  passport.authenticate('twitter', { successRedirect: '/apartments/new',
	  	failureRedirect: '/login' }));
	
	app.get('/auth/google', 
		passport.authenticate('google'));
	app.get('/auth/google/callback', 
		passport.authenticate('google', { successRedirect: '/apartments/new',
	  	failureRedirect: '/login' }));

	app.get('/logout', function(req, res){
	  req.logout();
	  res.redirect('/');
	});
/////////////////////////////////////////////////////////////////////////////
    
    //shows all apartments
 	app.get('/apartments', apart.getAllApartments);

 	
	//SAVE
	app.post('/apartments/new', apart.postApartment);
	// SHOW apartment by id
	app.get('/apartments/:id', apart.getOneApartment);

	// EDIT apartment by id
	app.get('/apartments/:id/edit', apart.editApartment);

	// UPDATE
	app.put('/apartments/:id', apart.putApartment);

// SHOW apartment by city
	app.get('/apartments/in/:city', apart.searchApartment);
	// DESTORY
	app.delete('/apartments/:id', apart.deleteApartment);


}

