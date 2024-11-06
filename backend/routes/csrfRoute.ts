import express from 'express';
import { checkAuthentication } from '../middlewares/authorization';
import { csrfController } from '../controllers/csrfController';
const router = express.Router();

router.route('/').get(checkAuthentication, csrfController);

export default router;
