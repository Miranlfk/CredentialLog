//Provides Logic for All the Credentials related operations
//PUT and DELETE operations are not utilized in the application to replicate the behaviour of merkle tree, they return an error on use.

const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialModel");


//@desc Get all credentials
//@route GET /api/logs
//@access private 
const getLogs = asyncHandler(async (req, res) => {   
    const credentials = await Credentials.find();
    res.status(200).json({ message: "All Credentials:", credentials });
});


//@desc Get a Credential using hash as a key
//@route GET /api/logs
//@access private 
const getLog = asyncHandler(async (req, res) => {
    const credentials = await Credentials.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    res.status(200).json({ message: "Credential:", credentials});
});

//@desc Create Credentials
//@route POST /api/logs
//@access private 
const createLogs = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, hash, signedReference, keyName, signAgent, file, keyFile } = req.body;
    if (!name || !hash || !signedReference || !keyName || !signAgent || !file || !keyFile) {
        res.status(400);
        throw new Error("Please provide all the required fields");
    }

    const credentialAvailable = await Credentials.findOne({ hash });
    if(credentialAvailable){
        res.status(400);
        throw new Error("Credentials already exists");
    }

    const credential = await Credentials.create({
        name,
        hash,
        signedReference,
        keyName,
        signAgent,
        file,
        keyFile
    });
    res.status(200).json({ message: "Credential created: ", credential});
});


//@desc Update a Credential using hash as key (it cannot be used to replicate the behaviour of merkle tree)
//@route PUT /api/logs
//@access private 
const updateLogs = asyncHandler(async (req, res) => {
    
    if (Object.keys(req.body).length > 0) {
        // Log unauthorized attempt to update fields
        console.error("Unauthorized attempt to update fields");
        res.status(403);
        throw new Error("Unauthorized attempt to update fields");
    }

    const credentials = await Credentials.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    const { hash, ...updateData } = req.body;
    const updatedCredentials = await Credentials.findOneAndUpdate(
        { hash: req.params.hash},
        updateData,
        { new: true }
    )
    res.status(200).json({ message: "Credential updated: ", updatedCredentials});
});

//@desc Delete a Credential using hash as key (its cannot be used to replicate the behaviour of merkle tree)
//@route DELETE /api/logs
//@access private 
const deleteLogs = asyncHandler(async (req, res) => {

    if (Object.keys(req.body).length > 0) {
        // Log unauthorized attempt to update fields
        console.error("Unauthorized attempt to delete document");
        res.status(403);
        throw new Error ("Unauthorized attempt to delete document");
    }
    const credentials = await Credentials.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    await Credentials.deleteOne({ hash: req.params.hash});
    res.status(200).json({ message: "Credential deleted: ", credentials});
});


module.exports = {getLogs, getLog, createLogs, updateLogs, deleteLogs};