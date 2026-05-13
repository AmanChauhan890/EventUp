const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.js');
 const eventRoutes = require('./routes/events.js')
const bookingRoutes = require('./routes/bookings.js');


dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);




app.listen(port || 5000, () => {
    console.log(`server is running at port: ${port}`)
})

