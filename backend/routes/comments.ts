import express from 'express';
const router = express.Router();
import {
  getComments,
  getCommentReplies,
  createComment,
} from '../controllers/comments';

router.route('/:article_id').get(getComments);
router.route('/:article_id/:comment_id').get(getCommentReplies);
router.route('/create').post(createComment);

export default router;
