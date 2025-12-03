import express from 'express';
import { checkAuthentication } from '../middlewares/authorization';
import { createComment, getComments } from '../controllers/comments';
import { csrfSync } from 'csrf-sync';
const router = express.Router();

const { csrfSynchronisedProtection } = csrfSync({
  errorConfig: { message: 'Your are unauthorized to this action!' },
});

router.route('/:article_id').get(getComments);
router.route('/create').post(checkAuthentication, csrfSynchronisedProtection, createComment);

export default router;
