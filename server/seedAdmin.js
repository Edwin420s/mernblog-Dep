// seedAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

const seedAdmin = async () => {
  try {
    // ✅ Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // ✅ Check for existing admin
    const exists = await User.findOne({ email: 'admin@example.com' });
    if (exists) {
      console.log('✅ Admin already exists');
      return process.exit();
    }

    // ✅ Hash the password
    const hashed = await bcrypt.hash('admin123', 10);

    // ✅ Create admin user with all required fields
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      username: 'admin',
      email: 'admin@example.com',
      password: hashed,
      role: 'admin',
      avatar: '', // optional
      bio: ''     // optional
    });

    console.log('🎉 Admin created:', admin.email);
    process.exit();
  } catch (err) {
    console.error('❌ Error seeding admin:', err.message);
    process.exit(1);
  }
};

seedAdmin();
