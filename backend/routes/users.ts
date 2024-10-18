import { checkAuthentication } from '../middlewares/authorization';
import { getUser } from '../controllers/users';
import { Router } from 'express';
const router = Router();

router.get('/', checkAuthentication, getUser);

export default router;
