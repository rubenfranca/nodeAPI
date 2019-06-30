const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/user');
const { validationResult } = require('express-validator');

exports.userSignup = async (req,res,next)=>{
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
        errors: errors.array()
    });
  }
    const userExists = await User.findOne({ email:req.body.email });
 
    if(userExists){
       return res.status(403).json({ message:`This user already exists ${userExists.email}` })
    }

 
    const newUser = await new User(req.body);
    await newUser.save();
    
     res.status(201).json({ message: 'Signup success! Please login' });
};

exports.signin = (req, res) => {
  // find the user based on email
  const { _id, email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    // if err or no user
    if (err || !user) {
      return res.status(401).json({
        error: 'User with that email does not exist. Please signin'
      });
    }

    // if user is found make sure email and password match
    //create authentication method in model and use here
    if (!user.authenticate(password))
      return res.status(401).json({
        error: 'Email and password do not match'
      });

    // generate token with user id and secret
    const token = jwt.sign({ _id: user._id },  process.env.JWT_SECRET);

    // persist the token as 't' in the cookie with expiration date
    res.cookie('t', token, { expire: new Date() + 9999 });

    // return response with user and token to front end client
    const { _id, name, email } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        name
      }
    });
  });
};

exports.signout = (req, res) => {
  res.clearCookie('t');
  return res.json({
    message: "Signout success",
  });
};