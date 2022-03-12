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

exports.create_new_user = [
    // Validate and sanitize fields.
    body('username', 'Username must be at list 6 characters long.')
        .isLength({ min: 3 })
        .escape(),
    body('password', 'Password must not be empty.')
        .isLength({ min: 1 })
        .escape(),
    body('password-reenter', "Please reenter you're password ")
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
