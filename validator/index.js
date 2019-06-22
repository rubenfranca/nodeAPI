const { check } = require('express-validator');

exports.createPostValidator = [
    // Title
    check('title', 'Write a title').exists(),
    check('title', 'Title must be between 4 to 150 characters').isLength({
        min: 4,
        max: 150
    }),

    // Body
    check('body', 'Write a body').exists(),
    check('body', 'Body must be between 4 to 2000 characters').isLength({
        min: 4,
        max: 2000
    }),
];