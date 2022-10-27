const express = require('express');
const fileUpload = require("express-fileupload");
const app = express();
app.use(fileUpload());
const {
    createUser,
    updateUser,
    viewUser,
    uploadDoc,
    getDocumentData,
    getAllData,
    deleteDoc
} = require("./controllers");


const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

//Routes
app.post("/v1/account", createUser);
app.put("/v1/account/:accountId", updateUser);
app.get("/v1/account/:accountId", viewUser);
app.post("/v1/documents", uploadDoc);
app.get("/v1/documents/:doc_id", getDocumentData);
app.get("/v1/documents", getAllData);
app.delete("/v1/documents/:doc_id", deleteDoc);
app.get("/healthz", (req, res) => {
    try {
        res.status(200).json("server responds with 200 OK if it is healhty.")
    } catch (err) {
        res.json(err.message);
    }
});
app.get('*', function (req, res) {
    res.status(404).json("Page not found!")
});
module.exports = app;