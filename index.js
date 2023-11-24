const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = express();

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/book', (req, res) => {
    res.send('Ore no na wa Okem-desu');
});


mongoose.
connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to MongoDB');
    app.listen(port, () => { console.log(`server running on port ${port}`) });
}).catch((error) => {
    console.log(error)
});
// const db = mongoose.connection;
// db.o



