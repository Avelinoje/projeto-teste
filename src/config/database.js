const { Pool } = require('pg');

// Database connection pool
// TODO: New Relic will automatically instrument database queries when the agent is added
const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || 'testdb',
  user: process.env.DB_USER || 'testuser',
  password: process.env.DB_PASSWORD || 'testpass',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Test database connection
const testConnection = async () => {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    return true;
  } catch (error) {
    throw error;
  }
};

// Execute query
const query = async (text, params) => {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);
    const duration = Date.now() - start;
    // TODO: New Relic will automatically track database query performance
    console.log(`[${new Date().toISOString()}] DB Query executed: ${duration}ms`);
    return result;
  } catch (error) {
    console.error(`[${new Date().toISOString()}] DB Query error:`, error.message);
    throw error;
  }
};

// Close pool
const close = () => {
  // TODO: New Relic will track shutdown events
  console.log(`[${new Date().toISOString()}] Closing database connection pool`);
  pool.end();
};

module.exports = {
  pool,
  query,
  testConnection,
  close
};
