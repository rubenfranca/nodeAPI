const express = require('express');
const { userSignup, signin, signout } = require('../controllers/auth');
const { userById } = require('../controllers/user');
const  { createUserSignupValidator } = require('../validator');

const router = express.Router();

router.post('/signup', createUserSignupValidator, userSignup);
router.post('/signin', signin);
router.get('/signout', signout);

// any route containing :userId our app will execute userById()
router.param('userId', userById);

module.exports = router;