const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");    
const User = require("../models/userModel");



const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.jwt){
        res.status(401);
        throw new Error("Cookie not found");
    }
    console.log("Cookies: ", cookies.jwt);
    const refreshToken = cookies.jwt;
    const user = User.findOne({ refreshToken });
    if(!user){
        res.status(401);
        throw new Error("User not found");
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err){
            res.status(403);
            throw new Error("User is not Authorized");
        }
        const accessToken = jwt.sign({ 
            user: {
                username: user.username,
                email: user.email,
                _id: user._id 
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s"});//5mins
        res.status(200).json({ accessToken });
    });
}

module.exports = { handleRefreshToken };