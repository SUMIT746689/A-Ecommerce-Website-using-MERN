//External libraries
const express = require('express');
const { default: mongoose } = require('mongoose');
const { defaultRouter, defaultErrorHandler } = require('./Controller/defaultErrorHandle/defaultErrorHandler');
const { routerSignup } = require('./router/signup');

//Internal library

//create a application
const app = express();

//config dotEnv 
require('dotenv').config();

//Database connection 
mongoose.connect(process.env.mongooseConnectionUrl)
    .catch(err=>{
        if(err){
            console.log(err);
        }
        else{
            console.log('database connection successful..')
        }
        
    });

//application set get data type 
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//set router
app.use('/auth/signup',routerSignup)

//application default route
app.use(defaultRouter);
//default error handler
app.use(defaultErrorHandler);

app.listen(3000,()=>{
    console.log('application listening..')
});