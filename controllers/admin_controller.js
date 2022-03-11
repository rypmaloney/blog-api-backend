require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

exports.post_new_post = [
    // Validate and sanitize fields.
    body('title', 'Title must not be empty.').isLength({ min: 1 }),
    body('body', 'The actually post is required, buddy')
        .trim()
        .isLength({ min: 1 }),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a message object with escaped and trimmed data.
        const post = new Post({
            title: req.body.title,
            body_text: req.body.body,
            date: new Date(),
            author: '62281f586618ead14f6ea580',
            stage: 'draft',
            labels: [],
        });

        if (!errors.isEmpty()) {
            //Successful, so render
            res.json(errors);
            return;
        } else {
            // Data from form is valid. Save item.
            post.save(function (err) {
                if (err) {
                    return next(err);
                }
            });
            res.status(200).json(post);
        }
    },
];
