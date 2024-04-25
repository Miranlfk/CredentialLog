//Routing for file upload and retrieval
const express = require('express');
const router = express.Router();
const { uploadLog, getLog, deleteFiles } = require("../controllers/fileController");
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single('file'), uploadLog);
router.route("/:hash").get(getLog);
router.route("/").delete(deleteFiles);

module.exports = router;
