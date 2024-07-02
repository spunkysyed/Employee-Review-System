import express from 'express';
import passport from 'passport';
import {SignUp,Signin,create,createSession,destroySession} from '../controllers/user.js';

const router = express.Router();

router.get('/Signin', passport.restrictAccess, Signin);
router.get('/Signup', passport.restrictAccess, SignUp);
router.post('/create', create);

// Use passport as a middleware to Authenticate
router.post('/create-session', passport.authenticate(
    'local', { failureRedirect: '/users/Signin' }
), createSession);

router.get('/Signout', destroySession);

export default router;
