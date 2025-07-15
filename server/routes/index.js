const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Your existing routes
// router.use('/users', userRoutes);
// router.use('/products', productRoutes);

// Add health check endpoint
router.get('/health', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  
  try {
    await mongoose.connection.db.admin().ping();
    res.status(200).json({
      status: 'OK',
      database: dbStatus,
      uptime: process.uptime()
    });
  } catch (err) {
    res.status(503).json({
      status: 'Service Unavailable',
      database: 'unreachable'
    });
  }
});

module.exports = router;