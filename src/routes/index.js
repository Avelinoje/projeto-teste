const express = require('express');
const router = express.Router();
const db = require('../config/database');

// TODO: New Relic will automatically create transaction names for these routes

// Health check endpoint
router.get('/health', (req, res) => {
  // TODO: This endpoint will be tracked by New Relic as a health check
  res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Root endpoint
router.get('/', (req, res) => {
  res.send('OK');
});

// Slow endpoint - simulates 2-5 second delay
// TODO: This endpoint will be useful for testing New Relic response time monitoring
router.get('/slow', (req, res) => {
  const delay = Math.floor(Math.random() * 3000) + 2000; // 2000-5000ms
  console.log(`[${new Date().toISOString()}] Slow endpoint: delaying for ${delay}ms`);

  setTimeout(() => {
    res.status(200).json({
      message: 'Response after delay',
      delay_ms: delay,
      timestamp: new Date().toISOString()
    });
  }, delay);
});

// Error endpoint - returns 500 error
// TODO: This endpoint will be useful for testing New Relic error tracking
router.get('/error', (req, res) => {
  console.error(`[${new Date().toISOString()}] Error endpoint triggered`);
  res.status(500).json({
    error: 'Intentional error for testing',
    timestamp: new Date().toISOString()
  });
});

// Database test endpoint (optional - for future New Relic DB instrumentation)
// TODO: This will be useful for testing New Relic database instrumentation
router.get('/db-test', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW() as current_time');
    res.status(200).json({
      message: 'Database query successful',
      data: result.rows[0],
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error(`[${new Date().toISOString()}] Database query error:`, error.message);
    res.status(500).json({
      error: 'Database query failed',
      message: error.message
    });
  }
});

module.exports = router;
