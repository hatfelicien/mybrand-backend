const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: "Bad request",
        Message: "Missing some fields :)",
      });
    }

    // check if user found or already registered
    const foundUser = await Users.findOne({ email });
    if (foundUser) {
      return res.status(403).json({
        status: "Bad request",
        Message: "Already registered :)",
      });
    }

    // create user object
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new Users({
      name,
      email,
      password: hashedPassword,
    });

    // save object to DB
    await newUser.save();
    return res.status(200).json({
      status: "OK",
      Message: "User created",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      Message: "User not Registered",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find();
    if (!users) {
      return res.status(404).json({
        status: "Not found",
        Message: "No User found :)",
      });
    }

    // users found
    return res.status(200).json({
      status: "OK",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      Message: "Fail to fetch users :)",
    });
  }
};

const Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // find if user exist
    const founUser = await Users.findOne({ email });
    if (!founUser) {
      return res.status(404).json({
        status: "Not Found",
        Message: "This user account Not found",
      });
    }

    // compare password entered with hashed user Password
    const passwordMatch = bcrypt.compareSync(password, founUser.password);
    if (!passwordMatch) {
      return res.status(404).json({
        Message: "Password Not match",
      });
    }

    const token = jwt.sign({ founUser }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      Message: "Login Successfull !",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "Bad request",
      Message: "Login Failed :) ",
    });
  }
};

module.exports = {
  Register,
  Login,
  getAllUsers,
};
