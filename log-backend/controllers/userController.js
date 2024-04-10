const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    
const User = require("../models/userModel");
const path = require("path");

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
        refreshToken: ""
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
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s"});//5mins
        const refreshToken = jwt.sign({ 
            user: {
                username: user.username,
                email: user.email,
                _id: user._id 
            },
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d"});
        user.refreshToken = refreshToken;
        await user.save();
        res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24*60*60*1000 })
        res.status(200).json({ accessToken });
    }
    else{
        res.status(400);
        throw new Error("Invalid email or password");
    }
});

//@desc Logout user
//@route GET /api/users/logout
//t

const logoutUser = async (req, res) => {
    //On client side, delete the accesstoken
    const cookies = req.cookies;
    if(!cookies?.jwt){
        res.send(401).json({ message: "User is already logged out"});
    }
    const refreshToken = cookies.jwt;
    //is refreshToken in USer DB
    const user = await User.findOne({ refreshToken });
    if(!user){
        res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true });
        res.status(204).json({ message: "User is already logged out"});
    }
    user.refreshToken = "";
    await user.save();
    res.clearCookie("jwt", { httpOnly: true, sameSite: 'None', secure: true });
    res.status(200).json({ message: "User logged out"});
}


// });

//@desc Current user info
//@route GET /api/users/current
//@access private 
const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});


module.exports = { registerUser, loginUser, currentUser, logoutUser};