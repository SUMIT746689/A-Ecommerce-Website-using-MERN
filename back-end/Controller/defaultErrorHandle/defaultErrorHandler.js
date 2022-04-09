//external librabries
const createError = require('http-errors');

//dafault router
const defaultRouter = (req,res,next)=>{
    next(createError(400,'Router not Founds'))
}

//default aerror handler
const defaultErrorHandler = (err,req,res,next)=>{
    res.status(err.status).json({
        errors : {
            common : {
                message : 'default errors founds'
            }
        }
    })
};

module.exports = {
    defaultRouter,
    defaultErrorHandler
}