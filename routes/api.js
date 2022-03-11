const { useColors } = require('debug/src/browser');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

/* GET users. */
router.get('/users/', function (req, res, next) {
    User.find({}, 'username').exec(function (err, user_list) {
        if (err) {
            return next(err);
        }
        const users = JSON.stringify(user_list);
        //Successful, so render
        res.json(users);
    });
});

router.get('/comments/', function (req, res, next) {
    res.send('NOT CREATED - COMMENT GET ROUTE');
});

/* GET specific comment. */
router.get('/comments/:commentid', function (req, res, next) {
    res.send('NOT CREATED - COMMENT GET ROUTE FOR COMMENTID');
});

/* GET all posts. */
router.get('/posts/', function (req, res, next) {
    res.send('NOT CREATED - POST GET ROUTE');
});

/* GET specific post. */
router.get('/posts/:postid', function (req, res, next) {
    res.send('NOT CREATED - POST GET ROUTE FOR POSTID');
});

module.exports = router;
