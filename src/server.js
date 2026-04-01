require('dotenv').config();
const app = require('./app');
const db = require('./config/database');

const PORT = process.env.PORT || 3000;

// TODO: New Relic will automatically start tracking when the agent is initialized

const server = app.listen(PORT, () => {
  console.log(`[${new Date().toISOString()}] Server running on port ${PORT}`);
  console.log(`[${new Date().toISOString()}] Environment: ${process.env.NODE_ENV || 'development'}`);

  // Test database connection if available
  // TODO: This will be useful for New Relic database instrumentation tests
  db.testConnection()
    .then(() => console.log(`[${new Date().toISOString()}] Database connection successful`))
    .catch((err) => console.log(`[${new Date().toISOString()}] Database not connected:`, err.message));
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log(`[${new Date().toISOString()}] SIGTERM signal received: closing HTTP server`);
  server.close(() => {
    console.log(`[${new Date().toISOString()}] HTTP server closed`);
    db.close();
  });
});

module.exports = server;
