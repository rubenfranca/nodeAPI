const express = require('express');
const { userSignup, signin, signout } = require('../controllers/auth');
const  { createUserSignupValidator } = require('../validator');

const router = express.Router();

router.post('/signup', createUserSignupValidator, userSignup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;