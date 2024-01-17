const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const dotenv = require('dotenv');
const database = require('./config/database')



dotenv.config();
const PORT = process.env.PORT || 4000;

// Database connection
database.connect();

// routes
const secretsRoutes = require('./routes/secrets');
const authRoutes = require('./routes/auth');

app.use(cors());
app.use('/auth', authRoutes);


// start server 


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
