const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const fs = require('fs'); // Importing the fs module
const dotenv = require('dotenv');
const videoRoutes = require('./routes/user.videoRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Ensure the uploads directory exists
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use video routes
app.use('/api', router);
app.use('/api/videos', videoRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 30000,
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.error('MongoDB connection error:', err));

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
