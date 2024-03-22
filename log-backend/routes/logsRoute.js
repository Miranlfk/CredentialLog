const express = require('express');
const router = express.Router();
const {
    getLogs, 
    getLog, 
    createLogs, 
    updateLogs, 
    deleteLogs
} = require("../controllers/logController");

router.route("/").get(getLogs).post(createLogs);
router.route("/:id").get(getLog);

// PUT and DELETE requests will not be utilized in the application to replicate behaviour of merkle tree.
router.route("/:id").put(updateLogs).delete(deleteLogs);






module.exports = router;
