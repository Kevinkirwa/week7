const express = require('express');
const { body } = require('express-validator');
const { register, login, getMe } = require('../controllers/userController');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const registerValidation = [
  body('username')
    .trim()
    .isLength({ min: 3 })
    .withMessage('Username must be at least 3 characters long'),
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
];

const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Please enter a valid email'),
  body('password')
    .exists()
    .withMessage('Password is required')
];

// Routes
router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);
router.get('/me', protect, getMe);

module.exports = router; 