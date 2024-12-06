require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
    origin: [process.env.CORS_ORIGIN]
};

app.use(cors(corsOptions));

app.get('/members', (req, res) => {
  res.json({ members: ['adi', 'alin', 'tinta'] });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});