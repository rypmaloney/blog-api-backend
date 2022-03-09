const { useColors } = require('debug/src/browser');
const express = require('express');
const User = require('../models/User');
const router = express.Router();

/* GET users. */
router.get('/', function (req, res, next) {
    User.find({}, 'username').exec(function (err, user_list) {
        if (err) {
            return next(err);
        }
        const users = JSON.stringify(user_list);
        //Successful, so render
        res.json(users);
    });
});

module.exports = router;
