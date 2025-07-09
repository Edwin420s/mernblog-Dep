// utils/generateToken.js

const jwt = require('jsonwebtoken');

const generateToken = (res, userId) => {
  const token = jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  // Set cookie with JWT
  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    sameSite: 'strict',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
  });

  return token; // Important if you want to use token in redirect URLs
};

module.exports = generateToken;
// Usage example in an Express route