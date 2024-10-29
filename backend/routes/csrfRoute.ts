import express from 'express';
import { csrfController } from '../controllers/csrfController';
const router = express.Router();

router.route('/').get(csrfController);

export default router;
