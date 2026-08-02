const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Range', 'Range', 'Content-Type']
}));

// Route matching your specific file name
app.get('/why-i-chose-them.mp3', (req, res) => {
  const filePath = path.join(__dirname, 'why-i-chose-them.mp3');

  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Audio file not found on server.');
  }

  // Set explicit CORS and content type headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'audio/mpeg');
  
  res.sendFile(filePath);
});

// Root fallback
app.get('/', (req, res) => {
  res.send('Audio hosting server is active.');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
