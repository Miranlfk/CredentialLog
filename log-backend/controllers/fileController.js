//Provides Logic for File upload and retrieval from File Database

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

    // Remove metadata from the file buffer
    const fileContent = removeMetadata(fileBuffer);

    // Compute hash of the file content
    const hash = createHash('sha256').update(fileContent).digest('hex');

    // Create credential without the metadata
    const credential = await Uploads.create({
        name: fileName,
        file: fileContent, // Store the file content in the database
        hash,
    });
    res.status(200).json({ message: "File uploaded", credential });
});

// Function to remove metadata from the file buffer
function removeMetadata(fileBuffer) {
    // Convert the buffer to string
    let fileString = fileBuffer.toString('utf-8');

    // Remove only the first occurrence of metadata lines
    fileString = fileString.replace(/^SignedReference:.*\n/, '');
    fileString = fileString.replace(/^Hash:.*\n/, '');

    // Convert back to buffer
    return Buffer.from(fileString, 'utf-8');
}



//@desc Get a Credential using hash as a key
//@route GET /api/file/:hash
//@access public 
const getLog = asyncHandler(async (req, res) => {
    const credentials = await Uploads.find({ hash: req.params.hash });
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found or file data is empty");
    }
    
    // Send the file data
    res.status(200).send(credentials[0].file);
})

const deleteFiles = asyncHandler(async (req, res) => {
    const deleteResult = await Uploads.deleteMany({});
    
    // Check if any documents were deleted
    if (deleteResult.deletedCount > 0) {
        res.status(200).json({ message: "All documents deleted successfully." });
    } else {
        res.status(404).json({ message: "No documents found to delete." });
    }

});  

module.exports = { uploadLog, getLog, deleteFiles };