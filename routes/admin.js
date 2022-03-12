require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult } = require('express-validator');
const admin_controller = require('../controllers/admin_controller');
const api_controller = require('../controllers/api_controller');

/* GET post new post page. */
router.get('/posts/new', function (req, res, next) {
    res.render('new_post', { title: 'Author a Post', errors: null });
});

/* GET all posts */
router.get('/posts/', admin_controller.get_all_posts);

/* GET all comments for a post (also returns post) */
router.get('/posts/:id/', api_controller.comment_list);

///PROTECTED ROUTES///
/* POST new post */
router.post('/posts/new/', [
    passport.authenticate('jwt', { session: false }),
    admin_controller.post_new_post,
]);
/* UPDATE post */
router.post('/posts/:id/update', [
    passport.authenticate('jwt', { session: false }),
    admin_controller.post_update_post,
]);

/* DELETE post */
router.delete('/posts/:id/delete', [
    passport.authenticate('jwt', { session: false }),
    admin_controller.post_delete_post,
]);

/* DELETE comment */
router.delete('/posts/:id/comments/:id/delete', [
    passport.authenticate('jwt', { session: false }),
    admin_controller.comment_delete_post,
]);

module.exports = router;
