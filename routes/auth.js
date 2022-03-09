var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
const bcryptjs = require('bcryptjs');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

router.get('/', function (req, res, next) {
    res.redirect('/admin/log-in/');
});

/* POST route to login to backend */
router.post('/log-in/', function (req, res, next) {
    //Use the local strategy defined in passport.js
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
                error: err,
            });
        }

        req.login({ user: user }, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            // generate a signed son web token with the contents of user object and return it in the response

            const token = jwt.sign({ user: user }, `${process.env.JWT_SECRET}`);
            return res.json({ user, token });
        });
    })(req, res);
});

/* POST route to sign up for backend */
router.post('/sign-up/', function (req, res, next) {
    res.send('SIGN UP POST');
});

/* GET route to login to backend */
router.get('/log-in/', function (req, res, next) {
    res.render('log_in', { title: 'Please Log In', errors: null });
});

/* GET route to sign up for backend */
router.get('/sign-up/', function (req, res, next) {
    res.render('sign_up', { title: 'Sign Up', errors: null });
});

module.exports = router;
