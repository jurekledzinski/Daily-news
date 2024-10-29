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
router.route('/logout').post(checkAuthentication, logoutUser);
router
  .route('/update_profile/:id')
  .patch(checkAuthentication, updateUserProfile);
router
  .route('/change_password/:id')
  .patch(checkAuthentication, changeUserPassword);

router.route('/delete_user/:id').delete(checkAuthentication, deleteUser);

export default router;
