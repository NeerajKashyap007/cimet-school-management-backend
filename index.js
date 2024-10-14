// server.js
import express, { json } from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import cors from 'cors'; // Import cors
import schoolRoutes from './routes/school.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/user.js';
import studentRoutes from './routes/student.js';

// Initialize environment variables
config();

// Initialize app
const app = express();

// Middleware to parse JSON
app.use(json());

// Enable CORS for all origins
app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

// Connect to MongoDB
connect(process.env.MONGO_URI)
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
app.use('/student', studentRoutes )
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
