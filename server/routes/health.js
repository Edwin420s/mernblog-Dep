const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

/**
 * @swagger
 * /api/health:
 *   get:
 *     summary: Check system health status
 *     description: Returns the health status of the API and database connection
 *     tags: [System]
 *     responses:
 *       200:
 *         description: System is healthy
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 timestamp:
 *                   type: string
 *                 uptime:
 *                   type: number
 *                 database:
 *                   type: string
 *                 details:
 *                   type: object
 *       503:
 *         description: Service unavailable
 */
router.get('/', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';

  try {
    // MongoDB ping
    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: dbStatus,
      dependencies: {
        mongodb: true,
        // redis: redisClient?.isOpen || false, // Optional Redis status
      },
      details: {
        memoryUsage: process.memoryUsage(),
        nodeVersion: process.version,
        environment: process.env.NODE_ENV || 'development',
        loadAvg: typeof process.getLoadAvg === 'function' ? process.getLoadAvg() : undefined,
      }
    });
  } catch (err) {
    res.status(503).json({
      status: 'Service Unavailable',
      timestamp: new Date().toISOString(),
      database: dbStatus,
      error: err.message,
    });
  }
});

module.exports = router;
