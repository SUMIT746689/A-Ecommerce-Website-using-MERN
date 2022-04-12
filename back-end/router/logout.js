const express = require('express');
const { logoutHandle } = require('../Controller/logoutHandle');
const { authenticate } = require('../utilities/authenticate');

const logoutrouter = express.Router();

logoutrouter.post('/',authenticate,logoutHandle)

module.exports={
    logoutrouter
}