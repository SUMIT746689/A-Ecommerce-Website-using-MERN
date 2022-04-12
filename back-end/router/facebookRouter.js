//External Library
const facebookRouter = require('express').Router();
const passport = require('passport');

//Internal Library


const CLIENT_URL = 'http://localhost:3000/' ;

//github routers
facebookRouter.get('/login/success',(req,res)=>{
    if(req.user){
        console.log(req.user)
        res.redirect(CLIENT_URL);
    }
})

facebookRouter.get('/login/failed',(req,res)=>{
    res.status(404).json({
        errors : {
            common : {
                msg : 'Github login failed'
            }
        }
    })
})

facebookRouter.get('/',passport.authenticate('facebook', { scope: [ 'profile' ] }));

facebookRouter.get('/callback', 
    
    passport.authenticate('facebook', {

        successRedirect : '/auth/github/login/success', 
        failureRedirect : '/auth/github/login/failed'
    
    })

);

  module.exports ={

      facebookRouter

  }