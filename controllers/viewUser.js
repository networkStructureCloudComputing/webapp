const pool = require("../db");
const logger = require('../logger');
const StatsD = require('statsd-client');
sdc = new StatsD({host: 'localhost', port: 8125});
const {
    basicAuth,
    comparePassword
} = require("../utils/helper");

const viewUser = (req, res) => {
    sdc.increment('endpoint.user.get - viewUser');
    const [username, password] = basicAuth(req);
    logger.info("User Display");
    if (!username || !password) {
        logger.info("Incorrect Information provided");
        return res.status(403).json("Forbidden Request");
    }

    let queries = "SELECT * from users where username = $1";
    let values = [username];
    
    pool.query(queries, values)
        .then(result => {
            if (result.rowCount) {
                const {
                    password: hashPassword
                } = result.rows[0];
                comparePassword(hashPassword, password)
                    .then(compareValue => {
                        if (compareValue) {
                            const data = result.rows[0];
                            delete data["password"];
                            return res.status(200).json(data);
                        } else {
                            return res.status(401).json("Incorrect Password");
                        }
                    })
            } else {
                return res.status(401).json("Username Incorrect");
            }
        })
        .catch(err => {
            return res.status(400).json(err.message)
        })
}

module.exports = viewUser;