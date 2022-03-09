const express = require('express');
const router = express.Router();

/* GET post new post page. */
router.get('/posts/new', function (req, res, next) {
    res.render('new_post', { title: 'Author a Post', errors: null });
});

/* GET all posts. */
router.get('/posts', function (req, res, next) {
    res.send('NOT CREATED - GET ALL POSTS PAGE');
});

module.exports = router;
