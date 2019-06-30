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

exports.createUserSignupValidator = [
    // Name is not null
    check('name', 'Name is required').exists(),
    //Email is not null
    check('email', 'Email is required')
        .matches(/.+\@.+\..+/)
        .withMessage('Email must contain @')
        .isLength({
            min: 4,
            max: 2000
        }),
    check('password', 'Password is required').exists()
        .isLength({
            min: 6
        })
        .withMessage('Password must be at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain a number')
];