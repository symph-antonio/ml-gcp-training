const mysql = require('mysql2/promise');
require('dotenv').config();

// MySQL connection configuration
const getConfig = () => {
  const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD || undefined,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  };

  // Check if we're using a Unix socket path (starts with /)
  if (process.env.DB_HOST && process.env.DB_HOST.startsWith('/')) {
    config.socketPath = process.env.DB_HOST;
  } else {
    // Otherwise use host/port (for local development)
    config.host = process.env.DB_HOST || 'localhost';
    config.port = process.env.DB_PORT || 3306;
  }

  return config;
};

const pool = mysql.createPool(getConfig());

// Test database connection
const testConnection = async () => {
  try {
    console.log('config', getConfig());
    const [results] = await pool.query('SELECT NOW() as now');
    return { connected: true, timestamp: results[0].now };
  } catch (err) {
    console.error('Database connection error:', err);
    return { connected: false, error: err.message };
  }
};

module.exports = {
  pool,
  testConnection
}; 