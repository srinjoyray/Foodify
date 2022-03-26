const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const sellerRoutes = require('./routes/seller');
const userRoutes = require('./routes/user');
const orderRoutes = require('./routes/order');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:false}));
app.use(cors());
app.use('/public' , express.static('public'));

// app.get('/',(req,res)=>{
//     res.json("Hello World");
// })

app.use('/seller', sellerRoutes);
app.use('/user',userRoutes);
app.use('/order',orderRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL,{useNewUrlParser : true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=> console.log(`Server running on port : ${PORT}`)))
    .catch(()=>console.log(error.message))



