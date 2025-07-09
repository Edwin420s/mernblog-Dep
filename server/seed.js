require('dotenv').config();
const mongoose = require('mongoose');
const Post = require('./models/Post');
const User = require('./models/User');

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  const user = await User.findOne(); // get the first registered user
  if (!user) {
    console.error('❌ No user found. Please register first.');
    process.exit(1);
  }

  const samplePosts = [
    {
      title: 'Intro to MERN Blog',
      content: 'This is a full-stack blog powered by MongoDB, Express, React, and Node.js.',
      image: 'https://source.unsplash.com/random/800x400?blog',
      category: 'Tech',
      author: user._id
    },
    {
      title: 'Second Post',
      content: 'Here’s another blog post example for testing UI components and layout.',
      image: 'https://source.unsplash.com/random/800x400?code',
      category: 'Coding',
      author: user._id
    }
  ];

  await Post.deleteMany({});
  await Post.insertMany(samplePosts);

  console.log('✅ Sample posts added!');
  process.exit();
};

seed();
