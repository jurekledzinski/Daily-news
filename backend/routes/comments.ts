import express from 'express';
const router = express.Router();
import {
  getComments,
  getCommentReplies,
  createComment,
  updateCommentLikes,
} from '../controllers/comments';

router.route('/:article_id').get(getComments);
router.route('/:article_id/:comment_id').get(getCommentReplies);
router.route('/create').post(createComment);
router.route('/likes/:article_id/:comment_id').patch(updateCommentLikes);

export default router;
