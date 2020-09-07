let express = require('express');
let router = express.Router();
let BearerToken = require('express-bearer-token');
let winston = require('../logs/winston');

// local code imports
let userController = require('../controllers/userController');
winston.debug('in router')
winston.debug(router)

// begin router controls
router.post('/user/authenticate', userController.signInUser);


module.exports = router;
