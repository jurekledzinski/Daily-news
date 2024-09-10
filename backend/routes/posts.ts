import express from 'express';
const router = express.Router();
import {
  getAllPosts,
  createPost,
  deletePost,
  updatePost,
} from '../controllers/posts';
import { csrfSync } from 'csrf-sync';
import { checkAuthentication } from '../middlewares/authorization';
const { csrfSynchronisedProtection } = csrfSync();

router.route('/').get(getAllPosts);
// Secured route authentication and check csrf token
router
  .route('/')
  .post(checkAuthentication, csrfSynchronisedProtection, createPost);

// Only secured route with check csrf token in route for test csrf token
// router.route('/').post(csrfSynchronisedProtection, createPost);

// Completely not secured route for test csrf token
// router.route('/').post(createPost);

router.route('/').patch(updatePost);

// Secured route authentication and check csrf token
// router
//   .route('/:id')
//   .delete(checkAuthentication, csrfSynchronisedProtection, deletePost);

// Completely not secured route for test csrf token
router.route('/:id').delete(deletePost);

export default router;
