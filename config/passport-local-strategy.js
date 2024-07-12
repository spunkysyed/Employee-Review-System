import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.SECRET_KEY; // You should store this in an environment variable

// Local strategy for username and password authentication
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

// JWT strategy for token authentication
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  async function (jwtPayload, done) {
    try {
      let user = await User.findById(jwtPayload.id);
      console.log(user)
      if (!user) {
        return done(null, false);
      }
      return done(null, user);
    } catch (error) {
      console.log('Error in finding the user with JWT:', error);
      return done(error, false);
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

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
};

// Middleware to check if the User is authenticated
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
