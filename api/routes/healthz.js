const express = require('express');

const router = express.Router();

router.get('/',(req, res, next) => {
    try {
        res.json("server responds with 200 OK if it is healhty.", 200)
    } catch (err) {
        res.json(err.message);
    }
});

module.exports = router;

