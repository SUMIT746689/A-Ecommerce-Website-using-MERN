//External libraries
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session');
require('dotenv').config();

//Internal library
const mongoose = require('mongoose');
const { defaultRouter, defaultErrorHandler } = require('./Controller/defaultErrorHandle/defaultErrorHandler');
const { routerSignup } = require('./router/signup');
const { routerLogin } = require('./router/login');
const { homerouter } = require('./router/Home');
const { isAuthRouter } = require('./router/isAuth');
const { logoutrouter } = require('./router/logout');
const passport = require('passport');
const { googleRouter } = require('./router/googleRouter');
const passportSetup = require('./utilities/passport');
const { githubRouter } = require('./router/githubRouter');
const { facebookRouter } = require('./router/facebookRouter');
const { routerVarifyOtp } = require('./router/varifyOtp');
const { routerResendOtp } = require('./router/resendOtp');

//create a application
const app = express();

//config dotEnv 


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

//set a cookie session
app.use(cookieSession({
    name : 'session',
    keys : [process.env.cookie_session_secret],
    maxAge : 24*60*60*1000
}));

//set session 
app.use(passport.initialize());
app.use(passport.session())

//set router

app.use('/auth/signup',routerSignup);
app.use('/auth/facebook',facebookRouter);
app.use('/auth/google',googleRouter);
app.use('/auth/github',githubRouter);
app.use('/auth/varify',routerVarifyOtp);
app.use('/auth/resendotp',routerResendOtp);
app.use('/auth/login',routerLogin);
app.use('/auth/logout',logoutrouter);
app.use('/home',homerouter);
app.use('/isAuth',isAuthRouter);

//application default route
app.use(defaultRouter);

//default error handler
app.use(defaultErrorHandler);

app.listen(process.env.PORT,()=>{
    console.log('application listening..',`${process.env.PORT}`)
});