import { checkAuthentication } from '../middlewares/authorization';
import { Router } from 'express';
import {
  changeUserPassword,
  getUser,
  deleteUser,
  logoutUser,
  updateUserProfile,
} from '../controllers/users';

const router = Router();

router.get('/', checkAuthentication, getUser);
router.route('/logout').post(logoutUser);
router.route('/update_profile/:id').patch(updateUserProfile);
router.route('/change_password/:id').patch(changeUserPassword);
router.route('/delete_user/:id').delete(deleteUser);

export default router;
