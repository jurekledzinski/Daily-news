import express from 'express';
const router = express.Router();
import { csrfController } from '../controllers/csrfController';

router.route('/').get(csrfController);

export default router;
