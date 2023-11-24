const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Product = require('./models/productModel');
const app = express();

const port = process.env.PORT || 3000;

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.get('/', (req, res) => {
    res.send('Hello World!');
});

//Fetch
app.get('/product', async (req, res) => {
    try{
        const product = await Product.find({});
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Fetch by ID
app.get('/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

// Post 
app.post('/product', async (req, res) => {
    try{
        const product = await Product.create(req.body);
        res.status(200).json(product);
    }catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
    // console.log(req.body);
    // res.send(req.body);
});

// Update
app.put('/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        } 
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }catch(error){
        res.status(500).json({message: error.message});
    }
});

app.delete('/product/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID ${id}`});
        }
        res.status(200).json(product);
    }catch(error){
        res.status(500).json({message: error.message});
    }
})

mongoose.
connect(process.env.MONGODB_URI)
.then(() => {
    console.log('connected to MongoDB');
    app.listen(port, () => { console.log(`server running on port ${port}`) });
}).catch((error) => {
    console.log(error)
});