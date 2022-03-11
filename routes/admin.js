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

/* GET all posts. */
router.get('/posts', admin_controller.get_all_posts);

/* POST new post */
router.post('/posts/new/', admin_controller.post_new_post);

/* UPDATE post */

/* DELETE post */

/* UPDATE make post live*/

module.exports = router;
