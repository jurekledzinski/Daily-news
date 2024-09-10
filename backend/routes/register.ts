import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/register';

router.route('/').post(registerUser);

export default router;
