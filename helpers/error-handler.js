const expressJwt = require('express-jwt');

function errorHandler (err, req, res, next){
    if(err){
        res.status(err.status).json({message: err.name})
    }
}

module.exports = errorHandler;