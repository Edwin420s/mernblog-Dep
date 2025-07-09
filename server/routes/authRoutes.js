// server/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');

const {
  register,
  login,
  logout,
  getProfile
} = require('../controllers/authController');

const { protect } = require('../middleware/authMiddleware');

// ========== Manual Auth Routes ==========

// @route   POST /api/auth/register
router.post(
  '/register',
  [
    check('firstName', 'First name is required').not().isEmpty(),
    check('lastName', 'Last name is required').not().isEmpty(),
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be at least 6 characters').isLength({ min: 6 })
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    // 🔍 Log input and validation errors for debugging
    console.log("📥 Register Payload:", req.body);
    console.log("❌ Validation Errors (Register):", errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    next();
  },
  register
);

// @route   POST /api/auth/login
router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
  ],
  (req, res, next) => {
    const errors = validationResult(req);

    // 🔍 Log input and validation errors for debugging
    console.log("📥 Login Payload:", req.body);
    console.log("❌ Validation Errors (Login):", errors.array());

    if (!errors.isEmpty()) {
      return res.status(400).json({ message: 'Validation failed', errors: errors.array() });
    }
    next();
  },
  login
);

// @route   POST /api/auth/logout
router.post('/logout', logout);

// @route   GET /api/auth/profile
router.get('/profile', protect, getProfile);

// ========== Google OAuth Routes ==========

// @route   GET /api/auth/google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// @route   GET /api/auth/google/callback
router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    const token = generateToken(res, req.user._id);

    // Redirect with token in URL (for SPA use)
    res.redirect(`http://localhost:5173?token=${token}`);
  }
);

// ✅ Utility function to generate token and set cookie
const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET || 'your_jwt_secret', {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return token;
};

module.exports = router;
