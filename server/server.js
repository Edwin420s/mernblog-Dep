// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const rateLimit = require('express-rate-limit');
require('./config/passport'); // Google strategy setup

// ✅ Optional Sentry Monitoring
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');

const app = express();
const sentryDsn = process.env.SENTRY_DSN;
const isSentryEnabled = sentryDsn && sentryDsn.startsWith('http');

if (isSentryEnabled) {
  Sentry.init({
    dsn: sentryDsn,
    integrations: [new Tracing.Integrations.Express({ app })],
    tracesSampleRate: 1.0,
  });
  app.use(Sentry.Handlers.requestHandler());
  app.use(Sentry.Handlers.tracingHandler());
}

// 🔐 Security Middleware
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
}));

// ✅ CORS Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ✅ Request Logging & Parsing
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Session Configuration with MongoStore
const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/mern-blog',
  collectionName: 'sessions',
  autoRemove: 'interval',
  autoRemoveInterval: 10 // every 10 minutes
});

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: sessionStore,
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
}));

// ✅ Passport Setup
app.use(passport.initialize());
// Optional: app.use(passport.session());

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/mern-blog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

mongoose.connection.on('connected', () => {
  console.log('✅ MongoDB connection active');
  mongoose.connection.db.admin().ping((err, result) => {
    if (err) {
      console.error('❌ MongoDB ping failed:', err);
      process.exit(1);
    }
    console.log('✅ MongoDB ping successful:', result);
  });
});

// ✅ Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'));
app.use('/api/health', require('./routes/health'));

// ✅ Sentry Error Handler (after routes)
if (isSentryEnabled) {
  app.use(Sentry.Handlers.errorHandler());
}

// ✅ Custom Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Something went wrong. Please try again later.',
  });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;
