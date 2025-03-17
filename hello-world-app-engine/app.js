const express = require('express');
const app = express();

// Set the port based on the environment variable or default to 8080
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
  res.send('Hello, World! Welcome to Google App Engine');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}); 