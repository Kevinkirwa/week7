const express = require('express');
const { body } = require('express-validator');
const {
  createPost,
  getPosts,
  getPost,
  updatePost,
  deletePost
} = require('../controllers/postController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const postValidation = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 100 })
    .withMessage('Title cannot be more than 100 characters'),
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required'),
  body('status')
    .optional()
    .isIn(['draft', 'published'])
    .withMessage('Status must be either draft or published')
];

// Routes
router.get('/', getPosts);
router.get('/:id', getPost);

// Protected routes
router.use(protect);
router.post('/', postValidation, createPost);
router.put('/:id', postValidation, updatePost);
router.delete('/:id', deletePost);

module.exports = router; 