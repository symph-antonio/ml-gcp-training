const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const mysql = require('mysql2/promise');
const { parse } = require('csv-parse/sync');
require('dotenv').config();

const storage = new Storage();

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

// Register a CloudEvent callback with the Functions Framework
functions.cloudEvent('todosImporter', async (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Processing file: ${file.name} from bucket: ${file.bucket}`);

  let connection;
  try {
    // Create database connection using connection string
    connection = await mysql.createConnection(getConfig());

    // Download the file from Cloud Storage
    const bucket = storage.bucket(file.bucket);
    const downloadedFile = bucket.file(file.name);
    const contents = await downloadedFile.download();
    const fileContent = contents[0].toString('utf-8');

    // Parse CSV content using latest csv-parse/sync API
    const records = parse(fileContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true // Trim whitespace from fields
    });

    console.log(`Parsed ${records.length} records from CSV`);
    
    // Filter out records with missing text field
    const validRecords = records.filter(record => record.text && record.text.trim() !== '');
    console.log(`Found ${validRecords.length} valid records with text fields`);
    
    // Prepare batch insert with chunking for large datasets
    if (validRecords.length > 0) {
      const CHUNK_SIZE = 100; // Process 100 records at a time to avoid query size limits
      let totalInserted = 0;
      
      // Process records in chunks
      for (let i = 0; i < validRecords.length; i += CHUNK_SIZE) {
        const chunk = validRecords.slice(i, i + CHUNK_SIZE);
        
        // Create batch insert query for this chunk
        const placeholders = chunk.map(() => '(UUID(), ?, ?, ?, ?)').join(', ');
        const sql = `INSERT INTO Todo (id, text, completed, createdAt, updatedAt) VALUES ${placeholders}`;
        
        // Flatten values for batch insert
        const now = new Date();
        const values = chunk.flatMap(record => [
          record.text,
          record.completed === 'true' || record.completed === '1' || record.completed === true ? 1 : 0,
          now,
          now
        ]);
        
        // Execute batch insert for this chunk
        const [result] = await connection.query(sql, values);
        totalInserted += result.affectedRows;
        console.log(`Inserted chunk ${i/CHUNK_SIZE + 1} with ${result.affectedRows} records`);
      }
      
      console.log(`Successfully imported ${totalInserted} todos in batch operation`);
    } else {
      console.log('No valid records found to import');
    }
  } catch (error) {
    console.error('Error processing file:', error);
    console.error(error.stack);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

