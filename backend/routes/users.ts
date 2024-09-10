import { Router } from 'express';
const router = Router();
import { getAllUsers, createUser } from '../controllers/users';

router.get('/', getAllUsers);
router.post('/create', createUser);

export default router;
