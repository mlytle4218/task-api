let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let winston = require('./api/config/winston.js');
require('dotenv').config()
app = express();
// Invitation = require('./api/models/invitation')
// User = require('./api/models/user')
var morgan = require('morgan');
let port = process.env.PORT;
let db = process.env.DB;
let host = process.env.HOST;

winston.info('Starting app...')

