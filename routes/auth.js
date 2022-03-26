require('dotenv').config();
const express = require('express');
const router = express.Router();
const auth_controller = require('../controllers/auth_controller');

/* POST route to login to backend */
router.post('/log-in/', auth_controller.log_in_user);

/* POST route to sign up for backend */
router.post('/sign-up/', auth_controller.create_new_user);

module.exports = router;
