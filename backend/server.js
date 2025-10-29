const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/routes');
const aiRoutes = require('./routes/ai');

const app = express();

// body parsers first
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials: false,
  })
);

// routes
app.use('/api', apiRoutes);
app.use('/api/ai', aiRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
