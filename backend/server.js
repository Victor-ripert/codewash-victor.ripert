/* eslint-env node */
/* global require, process, __dirname */

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3001;

// Allow CORS from Vite frontend
app.use(cors());
app.use(express.json());

// Set up Multer for saving files to backend/uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Ensure unique filenames
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, 'report-' + uniqueSuffix + '-' + file.originalname);
  },
});

// Configure Multer to enforce 5MB limit and max 3 files
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB per file
    files: 3, // Max 3 files
  },
});

// Store metadata about reports in a local JSON file
const DB_FILE = path.join(__dirname, 'reports.json');
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([]));
}

app.post('/api/reports', upload.array('attachments', 3), (req, res) => {
  try {
    const reportId = uuidv4();
    const timestamp = new Date().toISOString();

    const newReport = {
      id: reportId,
      timestamp,
      summary: req.body.summary || '',
      reproductionSteps: req.body.reproductionSteps || '',
      expectedResult: req.body.expectedResult || '',
      actualResult: req.body.actualResult || '',
      attachments: req.files ? req.files.map(f => f.filename) : [],
    };

    // Read the current DB and push the new report
    const dbData = JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
    dbData.push(newReport);
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2));

    res.status(201).json({ success: true, reportId });
  } catch (error) {
    console.error('Error saving bug report:', error);
    res.status(500).json({ success: false, message: 'Failed to save bug report.' });
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, _next) => {
  if (err instanceof multer.MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB.' });
    }
    if (err.code === 'LIMIT_FILE_COUNT') {
      return res.status(400).json({ success: false, message: 'Too many files. Maximum is 3.' });
    }
  }
  res.status(500).json({ success: false, message: err.message });
});

app.listen(PORT, () => {
  console.log(`Bug reporting backend running on http://localhost:${PORT}`);
});
