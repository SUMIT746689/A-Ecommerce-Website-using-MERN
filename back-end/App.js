//External libraries
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')

//Internal library
const { default: mongoose } = require('mongoose');
const { defaultRouter, defaultErrorHandler } = require('./Controller/defaultErrorHandle/defaultErrorHandler');
const { routerSignup } = require('./router/signup');
const { routerLogin } = require('./router/login');
const { homerouter } = require('./router/Home');
const { isAuthRouter } = require('./router/isAuth');

//create a application
const app = express();

//set other port request


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

//set a cookie parser
app.use(cookieParser(process.env.cookie_secret));

//set router
app.use('/auth/signup',routerSignup);
app.use('/auth/login',routerLogin);
app.use('/home',homerouter);
app.use('/isAuth',isAuthRouter);

//application default route
app.use(defaultRouter);

//default error handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT,()=>{
    console.log('application listening..',`${process.env.PORT}`)
});