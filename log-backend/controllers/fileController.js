const asyncHandler = require("express-async-handler");
const Uploads = require("../models/uploadModel");
const multer = require('multer');
const upload = multer(); 
const { createHash } = require('crypto');

//@desc Upload File
//@route POST /api/file
//@access public
const uploadLog = asyncHandler(async (req, res) => {
    if (!req.file) {
        res.status(400).json({ error: "Please provide a file" });
        return;
    }
    const fileBuffer = req.file.buffer; // Access the file buffer
    const fileName = req.file.originalname;
    const hash = createHash('sha256').update(fileBuffer).digest('hex');
    const credential = await Uploads.create({
        name: fileName,
        file: fileBuffer, // Store the file buffer in the database
        hash,
    });
    res.status(200).json({ message: "File uploaded", credential });
});

//@desc Get a Credential using hash as a key
//@route GET /api/file/:hash
//@access public 
const getLog = asyncHandler(async (req, res) => {
    const credentials = await Uploads.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    res.status(200).json({ message: "Credential:", credentials});
});

module.exports = { uploadLog, getLog };

