//external library
const express = require('express');
const { products } = require('../Controller/productsHandle/products');

//Internal library

const productsRouter = express.Router();

productsRouter.get('/',products) 

module.exports={
    productsRouter
}