const passport = require('passport');
// Not initilizing anything of passport because it is already done in app.js
var User = require('../models/user');
const LocalStrategy = require('passport-local');

// How user is stored in session is goven by serealizeUSer
passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, user){
		done(err,user);
	})
});

passport.use('local.signup', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	// console.log(req.headers);
	// req.checkBody('email', 'Invalid Email').notEmpty().isEmail();
	// req.checkBody('password', 'Invalid password').notEmpty().isLength({min: 6});
	// var errors = req.validationErrors();

	// if ( errors){
	// 	var messages = [];
	// 	errors.forEach(function(error){
	// 		messages.push(error.msg);
	// 	})
	// 	return done(null, false, req.flash('error', messages))
	// }
	User.findOne({'email': email}, function(err, user){
		if(err){

			console.log("inside error passport ")
			return done(err);
		}
		if(user){
			console.log("inside error passport  user")
			return done(null, false, {message: 'Email is already in use.'})
		}
		var newUser = new User();
		newUser.email = email;
		newUser.password = newUser.encryptPassword(password);

		newUser.save(function(err, result){
			if(err){
				return done(err);
			}
			return done(null, newUser);
		});
	});
}));


passport.use('local.signin', new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done){
	User.findOne({'email': email}, function(err, user){
		if(err){

			// console.log("inside error passport ")
			return done(err);
		}
		if(!user){
			return done(null, false, {message: 'No User Found'})
		}

		if(!user.validPassword(password)){
			return done(null, false, {message: 'Wrong Password'})
		}
		
		return done(null, user)
	});
}));