import express from 'express';
import { checkAuthentication } from '../middlewares/authorization';
import { csrfSync } from 'csrf-sync';
const router = express.Router();
import {
  getComments,
  getCommentReplies,
  createComment,
  updateCommentLikes,
} from '../controllers/comments';
const { csrfSynchronisedProtection } = csrfSync();

router.route('/:article_id').get(getComments);
router.route('/:article_id/:comment_id').get(getCommentReplies);
router
  .route('/create')
  .post(checkAuthentication, csrfSynchronisedProtection, createComment);
router.route('/likes/:article_id/:comment_id').patch(updateCommentLikes);

export default router;
