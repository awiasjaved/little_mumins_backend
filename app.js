const express = require('express');
const dotenv = require('dotenv');

const emailRoutes = require('../email-backend/routes/email');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors(corsOptions));
// Routes
app.use('/api/email', emailRoutes);

// Server listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});