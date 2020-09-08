let jwt = require('jsonwebtoken');
let jwt_key = process.env.SECRET_KEY
let jwt_expiration = process.env.EXPIRATION

exports.createWebToken = (user) => {
    return jwt.sign(user, jwt_key, {
        algorithm: 'HS256',
        expiresIn: jwt_expiration
    })
}