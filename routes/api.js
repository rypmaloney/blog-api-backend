const { useColors } = require('debug/src/browser');
const express = require('express');
const User = require('../models/User');
const router = express.Router();
const api_controller = require('../controllers/api_controller');

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

/* GET comments for a specific post */
router.post('/posts/:id/comments/', api_controller.comment_list);

/* POST a comment for a specific post */
router.post('/posts/:id/comments/', api_controller.comment_create_post);

/* GET specific post. */
router.get('/posts/:postid', function (req, res, next) {
    res.send('NOT CREATED - POST GET ROUTE FOR POSTID');
});

module.exports = router;
