const functions = require('@google-cloud/functions-framework');
const { Storage } = require('@google-cloud/storage');
const mysql = require('mysql2/promise');
const csv = require('csv-parse');
require('dotenv').config();

const storage = new Storage();

// Register a CloudEvent callback with the Functions Framework
functions.cloudEvent('todosImporter', async (cloudEvent) => {
  console.log(`Event ID: ${cloudEvent.id}`);
  console.log(`Event Type: ${cloudEvent.type}`);

  const file = cloudEvent.data;
  console.log(`Processing file: ${file.name} from bucket: ${file.bucket}`);

  let connection;
  try {
    // Create database connection using connection string
    connection = await mysql.createConnection(process.env.DATABASE_URL);

    // Download the file from Cloud Storage
    const bucket = storage.bucket(file.bucket);
    const downloadedFile = bucket.file(file.name);
    const contents = await downloadedFile.download();
    const fileContent = contents[0].toString('utf-8');

    // Parse CSV content
    const records = await new Promise((resolve, reject) => {
      csv.parse(fileContent, {
        columns: true,
        skip_empty_lines: true
      }, (err, records) => {
        if (err) reject(err);
        resolve(records);
      });
    });

    // Prepare and execute batch insert
    const values = records.map(record => [
      record.text,
      record.completed === 'true' || record.completed === '1' ? 1 : 0,
      new Date(),
      new Date()
    ]);

    const [result] = await connection.query(
      'INSERT INTO Todo (id, text, completed, createdAt, updatedAt) VALUES (UUID(), ?, ?, ?, ?)',
      values
    );

    console.log(`Successfully imported ${result.affectedRows} todos`);

  } catch (error) {
    console.error('Error processing file:', error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

