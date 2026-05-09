const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const port = process.env.PORT;

connectDB();

const app = express();

app.listen(port || 5000, () => {
    console.log(`server is running at port: ${port}`)
})

