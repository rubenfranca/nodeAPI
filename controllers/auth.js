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
}