let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let winston = require('./logs/winston.js');
require('dotenv').config()
app = express();
// Invitation = require('./api/models/invitation')
// User = require('./api/models/user')
var morgan = require('morgan');
let port = process.env.PORT;
let db_name = process.env.DB;
if (process.env.NODE_ENV == 'test'){
    db_name = 'task-test-db'
}
let host = process.env.HOST;

//setup options for db
let mongoDB = `mongodb://${host}/${db_name}`;

//connect to db
mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});


let db = mongoose.connection;
db.on('connected', () => {winston.info('Mongoose default connection to ' +  mongoDB)})
db.on('error', () => {winston.error(console)});
db.on('disconnected', () => {winston.info('Mongoose disconnected')});

// if doind a test, disable morgan
if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined', { stream: winston.stream }))
}

// look for raw text
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

// var routesV1 = require('./routesV1/routes');
// app.use('/api/v1/', routesV1)

app.listen(port)


winston.info(`Starting app on port ${port}...`);

module.exports = app