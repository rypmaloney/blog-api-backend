require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const Post = require('../models/Post');
const { body, validationResult, Result } = require('express-validator');
const auth_controller = require('../controllers/auth_controller');
const api_controller = require('../controllers/api_controller');
const bcryptjs = require('bcryptjs');
var async = require('async');
const User = require('../models/User');

/* POST route to login to backend */
router.post('/log-in/', auth_controller.log_in_user);

/* POST route to sign up for backend */
router.post('/sign-up/', auth_controller.create_new_user);

module.exports = router;
