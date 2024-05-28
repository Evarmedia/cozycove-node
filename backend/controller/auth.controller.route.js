const UserMod = require("../models/UserModel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = 'a@@R@!F!##31f318ha3rr8301' //Temporary token, do not do this in production


// manage singin
const signup = async (req, res) => {
  // Destructure the request body
  const { firstname, lastname, email, password } = req.body;

  try {
    // check if the user filled in the required fields
    if (!firstname || !lastname || !email || !password) {
      return res
        .status(400)
        .send({ message: "Please fill in all data fields." });
    }
    //first Check if the user is already in database
    const existingUser = await UserMod.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Email is already registered. Please sign in." });
    }


    // encrypt user password    
    const initialEncyptLevel = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, initialEncyptLevel);
    const newUser = new UserMod({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    // create a new user
    // const userReg = await UserMod.create(req.body);
    const userReg = await newUser.save();
    // res.status(201).json(userReg);

    return res
        .status(200)
        .send({ message: "Signup Completed, please login" });

  } catch (error) {
    console.log(error);
    // if (error.code === 11000 && error.keyValue.email) {
    //   ///check
    //   res.status(409).json({ message: "email already used" }); // check
    // }
    res.status(500).json({ message: error.message });
  }
};

// manage login
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserMod.findOne({ email: email });

    // check if user doesn't have an account
    if (!user) {
      return res.status(404).json({ message: "User Not Found, Please SignUp" }); //constinue from here
    }

    // check if password is correct using bycrypt
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Email or Password." });
    }

    const payload = {userId: user._id}


    const token = jwt.sign(payload, secret, {expiresIn: '1h'});

    res.json({
      message: `You are loged in as ${email}`,
      token: token
  })
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// show all users data
const showAllUsers = async (req, res) => {
  try {
    const allUsers = await UserMod.find({});
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// manage delete user data
const deleteUser = async (req, res) => {
  const { id } = req.params;
  // const {id} = req.params;

  try {
    // Find the user by ID and delete
    const user = await UserMod.findByIdAndDelete(id);

    // if user is not found
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// manage signOut action
const signout = async (req, res) => {};

// const forgotpassword = async (req, res) => {}
// const verifyemail = async (req, res) => {}

module.exports = {
  signin,
  signup,
  showAllUsers,
  deleteUser,
};
