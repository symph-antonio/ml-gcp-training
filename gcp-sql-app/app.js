const express = require('express');
const { testConnection, pool } = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json());

// Health check endpoint that tests the database connection
app.get('/health', async (req, res) => {
  try {
    const dbStatus = await testConnection();
    
    if (dbStatus.connected) {
      return res.status(200).json({
        status: 'healthy',
        database: dbStatus
      });
    } else {
      return res.status(500).json({
        status: 'unhealthy',
        database: dbStatus
      });
    }
  } catch (error) {
    console.error('Health check error:', error);
    return res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'GCP SQL App is running!',
    health: '/health'
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle shutdown gracefully
process.on('SIGTERM', async () => {
  console.log('SIGTERM signal received: closing HTTP server');
  await pool.end();
  process.exit(0);
}); 