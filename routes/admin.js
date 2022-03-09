const express = require('express');
const router = express.Router();

router.get('/', function (req, res, next) {
    res.redirect('/admin/log-in/');
});

/* GET route to login to backend */
router.get('/log-in/', function (req, res, next) {
    res.render('log_in', { title: 'Please Log In', errors: null });
});

/* GET route to sign up for backend */
router.get('/sign-up/', function (req, res, next) {
    res.render('sign_up', { title: 'Sign Up', errors: null });
});

/* GET post new post page. */
router.get('/posts/new', function (req, res, next) {
    res.render('new_post', { title: 'Author a Post', errors: null });
});

/* GET all posts. */
router.get('/posts', function (req, res, next) {
    res.send('NOT CREATED - GET ALL POSTS PAGE');
});

module.exports = router;
