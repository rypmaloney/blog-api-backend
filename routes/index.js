var express = require('express');
var router = express.Router();

/* GET home page. Redirects to log-in.  */
router.get('/', function (req, res, next) {
    res.redirect('/admin/log-in/');
});

module.exports = router;
