const pool = require("../db");

const {
    basicAuth,
    comparePassword
} = require("../utils/helper");

const {
    v4: uuidv4
} = require("uuid");

require("dotenv").config();
var AWS = require("aws-sdk");
const bucketName = process.env.S3_BUCKET;
const region = process.env.AWS_REGION;
const s3 = new AWS.S3({
    region
});

const uploadDoc = (req, res) => {
    const [username, password] = basicAuth(req);
    console.log(req);
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
                            uploadDocData(req, res, id);
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

const uploadDocData = (req, res, user_id) => {
    if(!req.files) return res.status(400).json("No data is provided");
    if(!req.files.fileName || !req.files.fileName.name) return res.status(400).json("Incorrect data format");
    const {
        fileName: {
            name: file_name,
            data: img
        }
    } = req.files;
    const fileType = ['pdf', 'csv', 'jpeg'];
    if (!fileType.includes(file_name.split('.')[1])) {
        return res.status(400).json("Only .pdf, .csv, or .jpeg is required");
    }
    
    let upload_date = new Date().toISOString().slice(0, 10);
    let docData = `documents/${user_id}/` + file_name;
    const params = {
        Bucket: bucketName,
        Key: docData,
        Body: img,
        Metadata: {
            file_name,
            id: uuidv4(),
            upload_date,
            user_id
        }
    }
    s3.upload(params, (err, data) => {
        if (err) {
            throw (err);
        }
        const {
            Location,
            Key
        } = data
        queries = "INSERT INTO documents(id, user_id, file_name, s3_bucket_path, upload_date, path) VALUES($1, $2,  $3, $4, $5, $6) RETURNING file_name, id, s3_bucket_path, upload_date,user_id";
        values = [uuidv4(), user_id, file_name, Location, upload_date, Key];
        pool.query(queries, values, (err, result) => {
            if (err) {
                return res.status(400).json("Error inserting data to database while upload");
            } else {
                return res.status(201).json(result.rows[0]);
            }
        })
    })
}

module.exports = uploadDoc;
