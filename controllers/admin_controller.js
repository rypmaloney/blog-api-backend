require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');

/* GET all posts for /posts/ */
exports.get_all_posts = (req, res) => {
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

/* POST new post function for /posts/new/ */
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

/* Update Post at /post/:id/update/ */
exports.post_update_post = [
    body('title', 'Title must not be empty.').isLength({ min: 1 }),
    body('body', 'The actually post is required, buddy')
        .trim()
        .isLength({ min: 1 }),

    (req, res, next) => {
        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create a item object with escaped/trimmed data and old id.
        const post = new Post({
            name: req.body.name,
            body_text: req.body.body,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/error messages.
            //Successful, so render
            res.status(401).json(errors);
            return;
        } else {
            // Data from form is valid. Update the record.
            Post.findByIdAndUpdate(
                req.params.id,
                post,
                {},
                function (err, thePost) {
                    if (err) {
                        return next(err);
                    }
                    // Successful - send the JSON of the updated post
                    res.json(thePost);
                }
            );
        }
    },
];

/* Delete Post at /post/:id/delete/ */
exports.post_delete_post = function (req, res, next) {
    Post.findByIdAndDelete(req.params.id).exec(function (err) {
        if (err) {
            return next(err);
        }
        // Successful, so render.
        res.json({
            message: 'Post deleted.',
        });
    });
};

/* Delete specific comment at /post/:id/comment/:id/delete/ */
exports.comment_delete_post = function (req, res, next) {
    Comment.findByIdAndDelete(req.params.id).exec(function (err) {
        if (err) {
            return next(err);
        }
        // Successful, so render.
        res.json({
            message: 'comment deleted.',
        });
    });
};
