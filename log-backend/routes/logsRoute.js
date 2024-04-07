const express = require('express');
const router = express.Router();
const {
    getLogs, 
    getLog, 
    createLogs, 
    updateLogs, 
    deleteLogs
} = require("../controllers/logController");
const validateToken = require('../middleware/tokenHandler');

//All the Routes related to Credentials use Tokens and will be private.
router.use(validateToken);
router.route("/").get(getLogs).post(createLogs);
// GET request to get a specific log using hash as it is unique and will be used as a key when user uploads a file for verification.
router.route("/:hash").get(getLog);

// PUT and DELETE requests will not be utilized in the application to replicate behaviour of merkle tree.
router.route("/:hash").put(updateLogs).delete(deleteLogs);






module.exports = router;
