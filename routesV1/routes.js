let express = require('express');
let router = express.Router();
let bearerToken = require('express-bearer-token');
let jwt = require('jsonwebtoken');
let winston = require('../logs/winston');


// local code imports
let userController = require('../controllers/userController');

let checkForBearerToken = (req, res, next) =>{
    if (req.token) {
        jwt.verify(req.token, process.env.SECRET_KEY, (error, decoded) =>{
            if (error){
                return res.json({'success':false, 'message': 'failed to authenticate'});
            } else {
                req.decoded = decoded;
                next();
            }
        })
    } else {
        winston.error('No token found in request');
        return res.status(403).send({
            'success': false,
            'message': 'No token found in request'
        })
    }
}


// begin router controls
router.post('/user/authenticate', userController.signInUser);
router.use(bearerToken())
router.use(checkForBearerToken)



module.exports = router;
