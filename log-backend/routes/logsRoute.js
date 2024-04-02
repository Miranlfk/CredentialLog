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

router.use(validateToken);
router.route("/").get(getLogs).post(createLogs);
router.route("/:hash").get(getLog);

// PUT and DELETE requests will not be utilized in the application to replicate behaviour of merkle tree.
router.route("/:hash").put(updateLogs).delete(deleteLogs);






module.exports = router;
