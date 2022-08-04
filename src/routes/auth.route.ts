import express from 'express';
import { loginHandler, registerHandler,  logoutHandler } from '../controllers/auth.controller';
import { validate } from '../middleware/validate';
import { createUserSchema, loginUserSchema } from '../schemas/user.schema';
import {requireUser} from "../middleware/requireUser";
import {deserializeUser} from "../middleware/deserializeUser";

const router = express.Router();

// Register user route
router.post('/register', validate(createUserSchema), registerHandler);

// Login user route
router.post('/login', validate(loginUserSchema), loginHandler,);

// Logout User
router.get('/logout', deserializeUser, requireUser, logoutHandler);

export default router;
