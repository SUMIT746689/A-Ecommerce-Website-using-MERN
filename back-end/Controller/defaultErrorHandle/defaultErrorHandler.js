//external librabries
const createError = require('http-errors');

const defaultRouter = (req,res,next)=>{
    next(createError(400,'Router not Founds'))
}

const defaultErrorHandler = (err,req,res,next)=>{
    res.status(err.status).json({
        errors : {
            common : {
                message : err.message
            }
        }
    })
};

module.exports = {
    defaultRouter,
    defaultErrorHandler
}