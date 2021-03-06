require('dotenv').config();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { body, validationResult, Result } = require('express-validator');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');

exports.create_new_user = [
    // Validate and sanitize fields.
    body('username', 'Username must be at list 6 characters long.')
        .isLength({ min: 3 })
        .escape(),
    body('password', 'Password must not be empty.')
        .isLength({ min: 1 })
        .escape(),
    body('passwordReenter', "Please reenter you're password ")
        .isLength({ min: 1 })
        .custom(async (confirmPassword, { req }) => {
            const password = req.body.password;
            console.log(req.body.password);

            // If password and confirm password not same
            // don't allow to sign up and throw error
            if (password !== confirmPassword) {
                throw new Error('Passwords must match.');
            }
        })
        .escape(),
    body('passcode', 'Please reenter enter the admin passcode')
        .isLength({ min: 1 })
        .custom(async (adminPasscode, { req }) => {
            const passcode = `${process.env.ADMIN_KEY}`;

            // If password and confirm password not same
            // don't allow to sign up and throw error
            if (passcode !== adminPasscode) {
                throw new Error('Incorrect admin passcode.');
            }
        })
        .escape(),

    //process request
    (req, res, next) => {
        const errors = validationResult(req);
        console.log(errors);

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            res.json(errors);
            return;
        } else {
            bcryptjs.hash(req.body.password, 10, (err, hashedPassword) => {
                if (err) {
                    res.json({
                        message: 'Problem with hashing password',
                    });

                    return next(err);
                } else {
                    const user = new User({
                        username: req.body.username,
                        password: hashedPassword,
                        date: new Date(),
                        permissions: 'editor',
                    }).save((err) => {
                        if (err) {
                            res.json({ err });
                            return next(err);
                        }
                        res.json({
                            message: 'Success! New user created',
                            user: user,
                        });
                    });
                }
            });
        }
    },
];

exports.log_in_user = function (req, res, next) {
    //Use the local strategy defined in passport.js
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err || !user) {
            console.log(err);
            return res.status(400).json({
                message: 'Something is not right',
                user: user,
                error: err,
                info: info,
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
};
