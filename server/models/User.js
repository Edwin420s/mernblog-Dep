const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// ✅ Define User schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user' // ✅ Role field for role-based access
  },
  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/demo/image/upload/v1621432349/default-avatar.png'
  },
  bio: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true // ✅ createdAt & updatedAt
});

// 🔒 Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash if changed
  this.password = await bcrypt.hash(this.password, 12); // Strong hash
  next();
});

// 🔐 Compare password for login
userSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// ✅ Export the model
module.exports = mongoose.model('User', userSchema);
