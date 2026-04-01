const express = require('express');
// TODO: Add New Relic instrumentation here in the future
// const newrelic = require('newrelic');

const routes = require('./routes');

const app = express();

// Middleware to parse JSON
app.use(express.json());

// TODO: New Relic will automatically add request tracking middleware
// Custom logging middleware - logs every request
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path}`);
  next();
});

// Mount routes
app.use('/', routes);

// Error handling middleware
// TODO: New Relic will capture errors automatically
app.use((err, req, res, next) => {
  console.error(`[${new Date().toISOString()}] Error:`, err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});

module.exports = app;
