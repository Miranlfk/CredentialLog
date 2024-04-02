const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error("Please fill all fields");
    }
    const userAvailable = await User.findOne({ email });
    if(userAvailable){
        res.status(400);
        throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashedPassword", hashedPassword);
    const user = await User.create({ 
        username, 
        email, 
        password: hashedPassword,
    });
    console.log("User: ", user);
    if (user) {
        res.status(201).json({_id: user._id, email: user.email });
    }else{
        res.status(400);
        throw new Error("Invalid user data");
    }
    res.json({ message: "User registered"});
});

//@desc Login user
//@route POST /api/users/login
//@access public 
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("Please fill all fields");
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({ 
            user: {
                username: user.username,
                email: user.email,
                _id: user._id 
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d"});
        res.status(200).json({ accessToken });
    }
    else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

//@desc Current user info
//@route GET /api/users/current
//@access private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser};