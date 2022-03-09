const express = require('express');
const router = express.Router();

/* GET all comments for a post based on the :postid (listed in app.js). */
router.get('/', function (req, res, next) {
    res.send('NOT CREATED - COMMENT GET ROUTE');
});

/* GET specific comment. */
router.get('/:commentid', function (req, res, next) {
    res.send('NOT CREATED - COMMENT GET ROUTE FOR COMMENTID');
});

module.exports = router;
