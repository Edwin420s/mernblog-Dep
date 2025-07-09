const Post = require('../models/Post');
const asyncHandler = require('express-async-handler');
const { cloudinary } = require('../config/cloudinary');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;
  
  let query = { status: 'published' };
  
  if (category) {
    query.categories = category;
  }
  
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { content: { $regex: search, $options: 'i' } }
    ];
  }
  
  const posts = await Post.find(query)
    .populate('author', 'username avatar')
    .populate('categories', 'name slug')
    .sort({ createdAt: -1 })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();
    
  const count = await Post.countDocuments(query);
  
  res.json({
    posts,
    totalPages: Math.ceil(count / limit),
    currentPage: page
  });
});

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate('author', 'username avatar bio')
    .populate('categories', 'name slug')
    .populate('comments.user', 'username avatar');
    
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Increment view count
  post.views += 1;
  await post.save();
  
  res.json(post);
});

// @desc    Create post
// @route   POST /api/posts
// @access  Private/Admin
const createPost = asyncHandler(async (req, res) => {
  const { title, content, categories, status } = req.body;
  
  if (!req.file) {
    res.status(400);
    throw new Error('Please upload a featured image');
  }
  
  const post = new Post({
    title,
    content,
    excerpt: content.substring(0, 300),
    featuredImage: req.file.path,
    author: req.user.id,
    categories,
    status
  });
  
  const createdPost = await post.save();
  res.status(201).json(createdPost);
});

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private/Admin
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Check if user is the author or admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to update this post');
  }
  
  post.title = req.body.title || post.title;
  post.content = req.body.content || post.content;
  post.excerpt = req.body.content ? req.body.content.substring(0, 300) : post.excerpt;
  post.categories = req.body.categories || post.categories;
  post.status = req.body.status || post.status;
  
  if (req.file) {
    // Delete old image from Cloudinary
    if (post.featuredImage) {
      const publicId = post.featuredImage.split('/').pop().split('.')[0];
      await cloudinary.uploader.destroy(`mern-blog/${publicId}`);
    }
    post.featuredImage = req.file.path;
  }
  
  const updatedPost = await post.save();
  res.json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private/Admin
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Check if user is the author or admin
  if (post.author.toString() !== req.user.id && req.user.role !== 'admin') {
    res.status(401);
    throw new Error('Not authorized to delete this post');
  }
  
  // Delete image from Cloudinary
  if (post.featuredImage) {
    const publicId = post.featuredImage.split('/').pop().split('.')[0];
    await cloudinary.uploader.destroy(`mern-blog/${publicId}`);
  }
  
  await post.remove();
  res.json({ message: 'Post removed' });
});

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  const comment = {
    user: req.user.id,
    text: req.body.text
  };
  
  post.comments.push(comment);
  await post.save();
  
  res.status(201).json({ message: 'Comment added' });
});

// @desc    Like a post
// @route   POST /api/posts/:id/like
// @access  Private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  
  if (!post) {
    res.status(404);
    throw new Error('Post not found');
  }
  
  // Check if the user has already liked the post
  if (post.likes.includes(req.user.id)) {
    res.status(400);
    throw new Error('You already liked this post');
  }
  
  post.likes.push(req.user.id);
  await post.save();
  
  res.json({ message: 'Post liked' });
});

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
  likePost
};