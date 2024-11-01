import express from 'express';
import { loginRateLimiter } from '../middlewares';
import { loginUser } from '../controllers/login';
const router = express.Router();

router.route('/').post(loginRateLimiter, loginUser);

export default router;
