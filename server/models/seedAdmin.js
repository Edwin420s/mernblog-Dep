// server/seedAdmin.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// ✅ Load environment variables from .env
dotenv.config();

// ✅ MongoDB URI from .env or fallback
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mern-blog';

// ✅ Connect to MongoDB and run seeding logic
mongoose
  .connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const email = 'admin@example.com';

    // ✅ Check if admin already exists
    const existing = await User.findOne({ email });

    if (existing) {
      console.log('✅ Admin user already exists');
    } else {
      const hashedPassword = await bcrypt.hash('admin123', 10);

      // ✅ Create admin user
      await User.create({
        firstName: 'Admin',
        lastName: 'User',
        username: 'admin',
        email: email,
        password: hashedPassword,
        role: 'admin',
        avatar: '', // Optional, or provide default URL
        bio: '',    // Optional
      });

      console.log('🎉 Admin user created successfully');
    }

    mongoose.disconnect();
  })
  .catch((err) => {
    console.error('❌ Error creating admin user:', err.message);
    mongoose.disconnect();
    process.exit(1);
  });
