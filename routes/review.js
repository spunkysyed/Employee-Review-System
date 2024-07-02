import express from 'express';
import passport from 'passport';
import {home,createReview} from '../controllers/review.js';

const router = express.Router();

router.get('/assignWork', passport.restrictAccessPages, home);
router.post('/createReview', createReview);

export default router;
