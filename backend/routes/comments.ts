import express from 'express';
const router = express.Router();
import {
  getComments,
  getCommentReplies,
  createComment,
  updateCommentLikes,
} from '../controllers/comments';

import { checkAuthentication } from '../middlewares/authorization';

router.route('/:article_id').get(getComments);
router.route('/:article_id/:comment_id').get(getCommentReplies);
router.route('/create').post(checkAuthentication, createComment);
router.route('/likes/:article_id/:comment_id').patch(updateCommentLikes);

export default router;
