const express = require('express');
const { userSignup, signin } = require('../controllers/auth');
const  { createUserSignupValidator } = require('../validator');

const router = express.Router();

router.post('/signup', createUserSignupValidator, userSignup);
router.post('/signin', signin);

module.exports = router;