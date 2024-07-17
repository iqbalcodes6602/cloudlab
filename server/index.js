// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/cloudlab', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.once('open', function() {
    console.log('MongoDB database connection established successfully');
  });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/services', require('./routes/services'));

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
