const express = require('express');
const router = express.Router();

/* GET users. */
router.get('/', function (req, res, next) {
    res.send('NOT CREATED - GET USER ROUTE');
});

module.exports = router;
