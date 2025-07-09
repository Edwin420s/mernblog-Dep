const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const upload = require('../middleware/uploadMiddleware');
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost
} = require('../controllers/postController');

// ✅ Public Routes
router.route('/')
  .get(getPosts)
  .post(
    protect,
    admin,
    upload.single('featuredImage'), // 🛠 match controller
    [
      check('title', 'Title is required').not().isEmpty(),
      check('content', 'Content must be at least 100 characters').isLength({ min: 100 }),
      check('categories', 'Categories must be an array').optional().isArray()
    ],
    createPost
  );

router.route('/:id')
  .get(getPost)
  .put(
    protect,
    admin,
    upload.single('featuredImage'),
    [
      check('title', 'Title is required').optional().not().isEmpty(),
      check('content', 'Content must be at least 100 characters').optional().isLength({ min: 100 }),
      check('categories', 'Categories must be an array').optional().isArray()
    ],
    updatePost
  )
  .delete(protect, admin, deletePost);

// 🔒 Only logged-in users can comment
router.route('/:id/comments')
  .post(
    protect,
    [check('text', 'Comment text is required').not().isEmpty()],
    addComment
  );

// 🔒 Only logged-in users can like
router.route('/:id/like')
  .post(protect, likePost);

module.exports = router;
