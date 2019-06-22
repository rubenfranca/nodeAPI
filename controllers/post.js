
const Post = require('../models/post');
const { validationResult } = require('express-validator');

exports.getPosts = (req, res) => Post.find().select('_id title body')
        .then(posts => res.json({
            posts
        }))
        .catch(err => console.log(err));

exports.createPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }

    const post = new Post(req.body);

    post.save()
        .then((result) => res.json({
            post: result
        }));
};