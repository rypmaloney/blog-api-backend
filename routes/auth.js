require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult, Result } = require('express-validator');
const auth_controller = require('../controllers/auth_controller');
const api_controller = require('../controllers/api_controller');
const bcryptjs = require('bcryptjs');
var async = require('async');
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

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.json(err);
            }

            // generate a signed son web token with the contents of user object and return it in the response

            const token = jwt.sign({ user: user }, `${process.env.JWT_SECRET}`);
            return res.json({ user, token });
        });
    })(req, res);
});

/* POST route to sign up for backend */
router.post('/sign-up/', auth_controller.create_new_user);

module.exports = router;
