import express from 'express';
import { registerUser } from '../controllers/register';

const router = express.Router();

router.route('/').post(registerUser);

export default router;
