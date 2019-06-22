
const Post = require('../models/post');
const { validationResult } = require('express-validator');

exports.getPosts = (req, res) => res.json({
    posts: [
        {
            title: 'First Post',
        }, {
            title: 'Second Post',
        }
    ]
});

exports.createPost = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            errors: errors.array()
        });
    }
    
    const post = new Post(req.body);

    post.save()
        .then((result) => res.status(200).json({
            post: result
        }));
};