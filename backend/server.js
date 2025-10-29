const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/routes');
const aiRoutes = require('./routes/ai');

const app = express();

// Security headers
app.use(helmet({ crossOriginResourcePolicy: false }));

// Parsers
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// CORS (for localhost + Amplify frontend + Render)
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'https://dev.d1rbi3c1b8jmmz.amplifyapp.com/',
  ...(process.env.ALLOWED_ORIGINS
    ? process.env.ALLOWED_ORIGINS.split(',').map((s) => s.trim())
    : []),
];

app.use(
  cors({
    origin(origin, cb) {
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      return cb(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: false,
  })
);

// Health check for Render
app.get('/health', (_req, res) => res.status(200).json({ ok: true }));

// Routes
app.use('/api', apiRoutes);
app.use('/api/ai', aiRoutes);

// Start
const PORT = process.env.PORT || 10000; // Render auto-assigns PORT
app.listen(PORT, () => console.log(`✅ API listening on port ${PORT}`));
