const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS with wildcard for all origins and methods
app.use(cors({
  origin: '*',
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Range', 'Range', 'Content-Type']
}));

// Explicit route for your audio file to ensure correct content-type & headers
app.get('/audio', (req, res) => {
  const filePath = path.join(__dirname, 'why-i-chose-them.mp3'); // <-- CHANGE TO YOUR AUDIO FILE NAME
  
  // Optional: dynamically set content type based on extension
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Accept-Ranges', 'bytes');
  
  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(404).send('Audio file not found on server.');
    }
  });
});

// Fallback root route
app.get('/', (req, res) => {
  res.send('Audio hosting server is running! Access the audio at /audio');
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
