import { checkAuthentication } from '../middlewares/authorization';
import { csrfSync } from 'csrf-sync';
import { Router } from 'express';
import { changeUserPassword, getUser, deleteUser, logoutUser, updateUserProfile } from '../controllers/users';

const { csrfSynchronisedProtection } = csrfSync({
  errorConfig: { message: 'Your are unauthorized to this action!' },
});

const router = Router();

router.get('/', checkAuthentication, getUser);
router.route('/logout').post(checkAuthentication, logoutUser);
router.route('/update_profile/:id').patch(checkAuthentication, csrfSynchronisedProtection, updateUserProfile);
router.route('/change_password/:id').patch(checkAuthentication, csrfSynchronisedProtection, changeUserPassword);
router.route('/delete_user/:id').delete(checkAuthentication, csrfSynchronisedProtection, deleteUser);

export default router;
