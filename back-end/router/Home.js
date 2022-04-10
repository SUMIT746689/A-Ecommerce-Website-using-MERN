const express = require('express');

const homerouter = express.Router();

homerouter.get('/',(req,res,next)=>{
    res.json('find Data');
}) 

module.exports={
    homerouter
}