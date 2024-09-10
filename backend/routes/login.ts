import express from 'express';
const router = express.Router();

import { loginUser } from '../controllers/login';

router.route('/').post(loginUser);

export default router;
