import { comparePassword, hashpassword } from "../Helper/authHelper.js";
import User from "../Model/userModel.js";
import JWT from "jsonwebtoken";

export const RegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({success: false, message: "User already exist" });
    // Hash password before saving it in database
    const hashedpassword = await hashpassword(password);
    const user = new User({ name, email, password: hashedpassword });
    await user.save();
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res
      .status(201)
      .json({ success: true,message: "User registered successfully", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Error in RegisterController" });
  }
};

//login user
export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({success: false, message: "Please provide email and password" });
    }
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({success: false, message: "User not found Please Register" });

    const match = await comparePassword(password, user.password);
    if (!match)
      return res.status(404).json({success: false, message: "invalid Email or Password" });

    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({ success: true, message: "Login Successful", user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({success: false, message: "Error in LoginController" });
  }
};
