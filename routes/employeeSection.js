import express from 'express';
import passport from 'passport';
import {home,update,makeAdmin,removeAdmin, deleteUser} from '../controllers/employeeSection.js';

const router = express.Router();

router.get('/home', passport.restrictAccessPages, home);
router.post('/update/:id', passport.checkAuthentication, update);
router.get('/delete/:id', deleteUser);
router.get('/makeadmin/:id', makeAdmin);
router.get('/removeadmin/:id', removeAdmin);

export default router;
