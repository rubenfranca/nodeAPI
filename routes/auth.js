const express = require('express');
const { userSignup } = require('../controllers/auth');
const  { createUserSignupValidator } = require('../validator');

const router = express.Router();

router.post('/signup', createUserSignupValidator, userSignup);

module.exports = router;