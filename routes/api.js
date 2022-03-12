require('dotenv').config();

const express = require('express');
const User = require('../models/User');
const router = express.Router();
const api_controller = require('../controllers/api_controller');
const passport = require('passport');

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

/* GET all posts. */
router.get('/posts/', api_controller.get_all_posts);

/* GET comments for a specific post (also returns post) */
router.get('/posts/:id/comments/', api_controller.comment_list);

/* POST a comment for a specific post */
router.post('/posts/:id/comments/', api_controller.comment_create_post);

module.exports = router;
