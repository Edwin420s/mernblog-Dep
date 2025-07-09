const User = require('../models/User');
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');

// ✅ Generate JWT and set as secure cookie
const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

// ✅ @desc Register a new user
// ✅ @route POST /api/auth/register
// ✅ @access Public
const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  // 🔍 Check if user already exists
  const userExists = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (userExists) {
    res.status(400);
    throw new Error('Username or email already exists');
  }

  // ✅ Create user
  const user = await User.create({
    firstName,
    lastName,
    username,
    email,
    password, // Will be hashed via Mongoose pre-save middleware
  });

  if (!user) {
    res.status(400);
    throw new Error('Invalid user data');
  }

  generateToken(res, user._id);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
});

// ✅ @desc Login user
// ✅ @route POST /api/auth/login
// ✅ @access Public
const login = asyncHandler(async (req, res) => {
  console.log('🟡 Login request body:', req.body);

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email });

  // ❌ Prevent leaking info about which field was wrong
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ message: 'Invalid email or password' });
  }

  generateToken(res, user._id);

  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    avatar: user.avatar,
  });
});

// ✅ @desc Logout user / clear cookie
// ✅ @route POST /api/auth/logout
// ✅ @access Private
const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// ✅ @desc Get current user profile
// ✅ @route GET /api/auth/profile
// ✅ @access Private
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});

module.exports = {
  register,
  login,
  logout,
  getProfile,
};
