require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

/* GET all posts for /posts/ */
exports.get_all_posts = (req, res, next) => {
    Post.find({}, 'title body_text user _id date')
        .populate('author')
        .exec(function (err, post_list) {
            if (err) {
                return next(err);
            }
            //Successful, so render
            JSON.stringify(post_list);
            return res.status(200).json(post_list);
        });
};

//GET Function for all comments for a given post
exports.comment_list = function (req, res, next) {
    async.parallel(
        {
            comments: function (callback) {
                Comment.find({ parent: req.params.id }).exec(callback);
            },
            message: function (callback) {
                Post.findById(req.params.id).populate('user').exec(callback);
            },
        },
        function (err, results) {
            console.log(results.message);
            if (err) {
                return next(err);
            }
            if (results.message == null) {
                // No results.
                var err = new Error('There is no post');
                err.status = 404;
                return next(err);
            }
            res.json(results);
        }
    );
};

/* POST new comment */
exports.comment_create_post = [
    // Validate and sanitize fields.
    body('comment', 'The actually post is required, buddy')
        .trim()
        .isLength({ min: 1 }),
    body('author', 'Who are you?').trim().isLength({ min: 1 }),

    // Process request after validation and sanitization.
    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a message object with escaped and trimmed data.
        var comment = new Comment({
            parent: req.params.id,
            body_text: req.body.comment,
            date: new Date(),
            user: req.author,
        });

        if (!errors.isEmpty()) {
            Post.findById(req.params.id)
                .populate('user')
                .exec(function (err, message) {
                    if (err) {
                        return next(err);
                    }
                    //Successful, so render
                    res.json({
                        errors: errors,
                    });
                    return;
                });
        } else {
            // Data from form is valid. Save item.
            comment.save(function (err) {
                if (err) {
                    return next(err);
                }
                //successful - redirect to new item record.
                res.json(comment);
            });
        }
    },
];
