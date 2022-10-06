const express = require('express');
const app = express();
const {
    createUser,
    updateUser,
    viewUser
} = require("./controllers");

const cors = require("cors");

// middleware
app.use(cors());
app.use(express.json());

//Routes
app.post("/v1/account", createUser);
app.put("/v1/account/:accountId", updateUser);
app.get("/v1/account/:accountId", viewUser);
app.get("/healthz", (req, res) => {
    try {
        res.status(200).json("server responds with 200 OK if it is healhty.")
    } catch (err) {
        res.json(err.message);
    }
});
app.get('*', function (req, res) {
    res.status(404).json("Page not found")
});
module.exports = app;