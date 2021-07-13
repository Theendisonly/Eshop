const expressJwt = require('express-jwt');

function authJwt(){
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return expressJwt({
        secret,
        algorithms:['HS256'],
        isRevoked: isRevoked
    }).unless({
        path:[
            {url: /*`${api}/products`*//\/api\/v1\/products(.*)/, methods: ['GET','OPTIONS']},
            {url: /*`${api}/products`*//\/api\/v1\/categories(.*)/, methods: ['GET','OPTIONS']},
            `${api}/users/login`,
            `${api}/users/register`
        ]
    })
}

async function isRevoked(req, payload, done){
    //payload es una variable que tiene conocimiento del contenido del token, por eso puede ver la variable isAdmin
    if(!payload.isAdmin){
        done(null, true)
    }
    done();
}

module.exports = authJwt;