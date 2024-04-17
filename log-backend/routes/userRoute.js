const express = require('express');
const { registerUser, loginUser, currentUser, logoutUser } = require('../controllers/userController');
const validateToken = require('../middleware/tokenHandler');
const refreshTokenController = require('../controllers/refreshTokenController');


const router = express.Router();

// Register and login routes are public, login route will return a token
router.post("/register", registerUser);
router.post("/login", loginUser);
// Get the current user using the token obtained when logging in
router.get("/current", refreshTokenController.handleRefreshToken, validateToken, currentUser);
// Refresh the token
router.get("/refresh", refreshTokenController.handleRefreshToken);
// Logout the user
router.get("/logout", logoutUser);

module.exports = router;