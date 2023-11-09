import { User } from "../models/user.js";
import bcrypt from 'bcrypt'
import { createError } from "../utils/error.js";
import  jwt  from 'jsonwebtoken';

export const register = async (req, res, next) => {
  try {
    const {username, email, isAdmin} = req.body;
    const user = await User.findOne({ where: { email } })
    if(user) return next(createError(400,"You are already registered please try to login!"));
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);  
    const newUser = await User.create({username, email, password: hashPassword, isAdmin})
    const { password, createdAt, updatedAt, ...otherDetails } = newUser.dataValues ;
    if(newUser) res.status(201).json({user: otherDetails ,message: 'Successfully registered'});
  } catch (error) {
    next(error);
  }
};


export const login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } })
    if(!user) return next(createError(404,"User Not Found With This Email !"));
    const isPassword = await bcrypt.compare(req.body.password, user.password);
    if(!isPassword) return next(createError(400, "Wrong Password"));
     const token = jwt.sign({id: user.id, user: user.username, isAdmin: user.isAdmin},process.env.JWT_SECRET);
    const { password, createdAt, updatedAt, ...otherDetails } = user.dataValues ;
    res.cookie("access_token",token,{
      httpOnly: true
    }).status(200).json(otherDetails)
  } catch (error) {
    next(error)
  }
}