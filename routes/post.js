const express = require('express');
const { getPosts, createPost } = require('../controllers/post');
const { userById } = require('../controllers/user');
const  { createPostValidator } = require('../validator');
const { requireSignin } = require('../controllers/auth');

const router = express.Router();

router.get('/', getPosts);
router.post('/post',requireSignin, createPostValidator, createPost);

// any route containing :userId our app will execute userById()
router.param('userId', userById);

module.exports = router;