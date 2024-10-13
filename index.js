// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); // Import cors
const schoolRoutes = require('./routes/school');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

// Initialize environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

// Define a route for the root URL
app.get('/', (req, res) => {
    res.send('Welcome to the API!'); // You can customize this message
});

// Use routes
app.use('/api', schoolRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// MONGO_URI = mongodb+srv://bhardwajvarsha49:Varsha1405@school-management-clust.7el4e.mongodb.net/school-management?retryWrites=true&w=majority&appName=school-management-cluster

// JWT_SECRET = nfkjjfjfghjfhjhajhjhafhdhjhfhvbdhbfjbdjbjnbasdjbna