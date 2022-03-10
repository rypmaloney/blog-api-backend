const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
/* GET post new post page. */
router.get('/posts/new', function (req, res, next) {
    res.render('new_post', { title: 'Author a Post', errors: null });
});

/* GET all posts. */
router.get(
    '/posts',
    passport.authenticate('jwt', { session: false }),
    (req, res) => {
        return res.status(200).send('YAY! this is a protected Route');
    }
);

module.exports = router;
