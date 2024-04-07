const express = require('express');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
const validateToken = require('../middleware/tokenHandler');

const router = express.Router();

// Register and login routes are public, login route will return a token
router.post("/register", registerUser);
router.post("/login", loginUser);

// Get the current user using the token obtained when logging in
router.get("/current", validateToken, currentUser);

module.exports = router;