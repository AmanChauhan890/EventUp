const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.js');
const eventRoutes = require('./routes/events.js')

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);



app.listen(port || 5000, () => {
    console.log(`server is running at port: ${port}`)
})

