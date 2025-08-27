const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes');
const app = express();
// Mount router at /api (so final paths are /api/, /api/data, /api/upload)
app.use('/api', routes);

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // no trailing slashes
    credentials: false,
  })
);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
