require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');
const admin_controller = require('../controllers/admin_controller');

/* GET post new post page. */
router.get('/posts/new', function (req, res, next) {
    res.render('new_post', { title: 'Author a Post', errors: null });
});

/* GET all posts */
router.get('/posts', admin_controller.get_all_posts);

/* POST new post */
router.post('/posts/new/', admin_controller.post_new_post);

/* UPDATE post */
router.post('/posts/:id/update', admin_controller.post_update_post);

/* DELETE post */
router.delete('/posts/:id/delete', admin_controller.post_delete_post);

/* GET all comments for a post */

/* POST a new comment */

/* DELETE comment */
module.exports = router;
