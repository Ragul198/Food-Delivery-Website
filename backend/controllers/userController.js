import userModel from "../models/userModle.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import "dotenv/config.js";

const creatToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ Sucess: false, message: "user does not exits" });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ Sucess: false, message: "incorrect password" });
    }

    const token = creatToken(user._id);
    res.json({ Sucess: true, token , message:"login" });
  } catch (error) {
    console.log(error);
    res.json({ Sucess: false, message: "something went wrong on login" });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // checking user already exists or not
    const exist = await userModel.findOne({ email });
    if (exist) {
      return res.json({ Sucess: false, message: "user already exists" });
    }

    // checking email is valid or not
    if (!validator.isEmail(email)) {
      return res.json({ Sucess: false, message: "invalid email" });
    }

    //checking password length
    if (password.length < 8) {
      return res.json({
        Sucess: false,
        message: "password must be greater than 8 characters",
      });
    }
    // hashing the password
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    // creating new user
    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = creatToken(user._id);
    res.json({ Sucess: true, token , message:"register" });
  } catch (err) {
    console.log(err);
    res.json({
      Sucess: false,
      message: "something went wrong on registering user",
    });
  }
};

export { loginUser, registerUser };
