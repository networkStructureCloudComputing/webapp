const pool = require("../db");
const logger = require('../logger');
const StatsD = require('statsd-client');
sdc = new StatsD({host: 'localhost', port: 8125});
const {
    basicAuth,
    comparePassword
} = require("../utils/helper");

const getDocumentData = (req, res) => {
    sdc.increment('endpoint.user.get - getDoc');
    const [username, password] = basicAuth(req);
    let file_id = req.params.doc_id;
    if (!username || !password) {
        return res.status(403).json("Forbidden Request");
    }

    let queries = "SELECT * from users where username = $1";
    let values = [username];

    pool.query(queries, values)
        .then(result => {
            if (result.rowCount) {
                const {
                    password: hashPassword,
                    id
                } = result.rows[0];
                comparePassword(hashPassword, password)
                    .then(compareValue => {
                        if (compareValue) {
                            getDocData(req, res, file_id);
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

const getDocData = (req, res, user_id) => {
    logger.info("Fetching Documents");
    let queries = "Select file_name, id, s3_bucket_path, upload_date, user_id from documents where id = $1"
    let values = [user_id]
    pool.query(queries, values)
        .then(result => {
            if (!result.rowCount) {
                return res.status(404).json("Document not found");
            } else {
                result.rows[0].upload_date = new Date(result.rows[0].upload_date).toISOString().slice(0, 10)
                return res.status(200).json(result.rows[0]);
            }
        })
}

module.exports = getDocumentData;
