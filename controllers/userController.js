let winston = require('../logs/winston');

winston.debug('in userController');

/**
 * Signs in the user. eventually will authorized against a windows domain controller
 * @param {object} req 
 * @param {object} res 
 */
exports.signInUser = async (req, res) => {
    if (req.body.username == null) {
        let responseData = {
            "errors": {
                "username": { "missing": true }
            }
        };
        res.status(401).send(responseData);
    } else if (req.body.password == null) {
        let responseData = {
            "errors": {
                "password": { "missing": true }
            }
        };
        res.status(401).send(responseData);
    } else {
        let responseData = {
            'token': "string",
            'users': []
        }
        res.status(200).send(responseData)

    }
}