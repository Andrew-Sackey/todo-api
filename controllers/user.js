import { registerUserValidator, loginUserValidator } from "../validators/user.js";
import { UserModel } from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
try {
    // validate user input
    const {error, value} = registerUserValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error);
    }
    // Check if user does not exist
    const user = await UserModel.findOne({email: value.email});
    if (user) {
      return res.status(409).json('user already exists!');
    }
    // Hash their password
    const hashedPassword = bcrypt.hashSync(value.password, 10);
    // Save the user into the database
    await UserModel.create({
      ...value,
      password: hashedPassword 
    });
    // Send user confirmation email 
    // Respond to the request
    res.json("User registered");
} catch (error) {
  next(error);
}
}

export const login = async (req, res, next) => {
 try {
  // validate user input
  const {error, value} = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // find one user with identifier
  const user = await UserModel.findOne({email: value.email});
  if (!user) {
    return res.status(404).json('user does not exist!');
  }
  // compare their passwords
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json('Invalid credentials!');
  }
  // Sign a token for the user
  const token = jwt.sign(
    { id:user.id },
    process.env.JWT_PRIVATE_KEY,
    {expiresIn: '24h'}
  );
  // Respond to request
   res.json({
    message: "user logged in!",
    accessToken: token
   });
 } catch (error) {
  next(error);
 }
}

export const getprofile = (req, res, next) => {
  res.json('User Profile');
}

export const logout = (req, res, next) => {
  res.json("User logged out");
}

export const updateProfile = (req, res, next) => {
  res.json('User profile updated');
}
