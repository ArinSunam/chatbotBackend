import User from "../models/User.js"
import { hash } from 'bcrypt'

//GET ALL USERS

export const getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find();
    return res.status(200).json({
      message: "OK",
      users
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "ERROR", cause: error.message
    })

  }
};

// USER SIGNUP
export const userSignup = async (req, res, next) => {

  try {
    const { name, email, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashedPassword
    })
    await user.save();
    return res.status(200).json({
      message: "OK",
      id: user._id.toString()
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({
      message: "ERROR", cause: error.message
    })

  }
};