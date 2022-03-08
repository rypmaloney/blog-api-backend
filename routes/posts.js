const express = require('express');
const router = express.Router();

/* GET all posts. */
router.get('/', function (req, res, next) {
    res.send('NOT CREATED - POST GET ROUTE');
});

/* GET specific post. */
router.get('/:postid', function (req, res, next) {
    res.send('NOT CREATED - POST GET ROUTE FOR POSTID');
});

module.exports = router;
