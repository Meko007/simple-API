const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost/subscribers');
// const db = mongoose.connection;
// db.o

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => console.log(`server running on port ${port}`));