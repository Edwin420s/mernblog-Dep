require('dotenv').config(); // ✅ Load environment variables early

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

// ✅ Debug logs to verify .env values are loaded
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);

// ✅ Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;

        // Check if user already exists by email
        let user = await User.findOne({ email });

        if (!user) {
          // Create a new user
          user = await User.create({
            googleId,
            firstName: profile.name?.givenName || 'Google',
            lastName: profile.name?.familyName || 'User',
            username: profile.displayName.replace(/\s+/g, '').toLowerCase(),
            email,
            password: Math.random().toString(36).slice(-8), // Temporary password
          });
        }

        return done(null, user);
      } catch (err) {
        console.error('❌ Google OAuth error:', err);
        return done(err, null);
      }
    }
  )
);

// ✅ Required for session-based auth (even if not used now)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
// This file sets up the Google OAuth strategy for Passport.js