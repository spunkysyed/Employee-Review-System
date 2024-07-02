import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../models/user.js';

// Authentication using Passport
passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async function (req, email, password, done) {
    try {
      // Find a User and establish identity
      let user = await User.findOne({ email: email });
      if (!user || user.password !== password) {
        req.flash('error', 'Invalid username/password');
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log('Error in finding the User:', error);
      return done(error);
    }
  }
));

// Serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then(function (user) {
      return done(null, user);
    })
    .catch(function (error) {
      console.log('Error in finding the user--Passport:', error);
      return done(error);
    });
});

// Check if the User is authenticated
passport.checkAuthentication = function (req, res, next) {
  // If the user is signed in then pass on the request to the next function (Controller's action)
  if (req.isAuthenticated()) {
    return next();
  }
  // If the user is not signed in
  return res.redirect('/users/Signin');
};

// Middleware to set authenticated user in locals
passport.setAuthenticatedUser = function (req, res, next) {
  // req.user contains the current signed in user from the session cookies and we are sending this to the locals for the views
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  next();
};

// Middleware to restrict access based on permission
passport.restrictAccess = function (req, res, next) {
  if (req.isAuthenticated() && req.user.permission !== 'admin') {
    return res.redirect('back');
  }
  next();
};

// Middleware to restrict access to pages based on permission (admin only)
passport.restrictAccessPages = function (req, res, next) {
  if (req.isAuthenticated() && req.user.permission === 'admin') {
    return next();
  }
  return res.redirect('back');
};

export default passport;
