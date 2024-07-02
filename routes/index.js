import express from 'express';
import {home,completeReview} from '../controllers/home.js';
import passport from 'passport';
import userRoutes from './users.js';
import reviewRoutes from './review.js';
import employeeRoutes from './employeeSection.js';

const router = express.Router();

router.get('/', passport.checkAuthentication,home);
router.post('/completeReview', passport.checkAuthentication,completeReview);

router.use('/users', userRoutes);
router.use('/review', reviewRoutes);
router.use('/employee', employeeRoutes);

export default router;
