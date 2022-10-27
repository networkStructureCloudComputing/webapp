const pool = require("../db");

const {
    basicAuth,
    comparePassword
} = require("../utils/helper");

const getAllData = (req, res) => {
    const [username, password] = basicAuth(req);

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
                            getDocData(req, res, id);
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
    let queries = "Select file_name, id, s3_bucket_path, upload_date, user_id from documents where user_id = $1"
    let values = [user_id]
    pool.query(queries, values)
        .then(result => {
            if (!result.rowCount) {
                return res.status(404).json("Document not found");
            } else {               
                return res.status(200).json(result.rows);
            }
        })
}

module.exports = getAllData;
