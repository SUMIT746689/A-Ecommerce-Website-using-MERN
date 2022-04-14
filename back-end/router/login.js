//external library
const express = require('express');

//internal library
const { loginHandle } = require('../Controller/logIn/loginHandle');

const routerLogin = express.Router();

routerLogin.post('/',loginHandle);

module.exports ={
    routerLogin
}

