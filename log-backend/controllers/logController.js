const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialModel");
//@desc Get all credentials
//@route GET /api/logs
//@access public 

const getLogs = asyncHandler(async (req, res) => {
    const credentials = await Credentials.find();
    res.status(200).json({ message: "All Credentials:", credentials});
});


//@desc Get a Credential
//@route GET /api/logs
//@access public 

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
//@access public 

const createLogs = asyncHandler(async (req, res) => {
    console.log("The request body is: ", req.body);
    const { name, hash, keyName, trustPolicy } = req.body;
    if (!name || !hash || !keyName || !trustPolicy) {
        res.status(400);
        throw new Error("Please provide all the required fields");
    }
    const credential = await Credentials.create({
        name,
        hash,
        keyName,
        trustPolicy
    });
    res.status(200).json({ message: "Credential created: ", credential});
});

//@desc Update a Credential
//@route PUT /api/logs
//@access public 

const updateLogs = asyncHandler(async (req, res) => {
    const credentials = await Credentials.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    const updatedCredentials = await Credentials.findOneAndUpdate(
        { hash: req.params.hash},
        req.body,
        { new: true }
    )
    res.status(200).json({ message: "Credential updated: ", updatedCredentials});
});

//@desc Delete a Credential
//@route DELETE /api/logs
//@access public 

const deleteLogs = asyncHandler(async (req, res) => {
    const credentials = await Credentials.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    await Credentials.deleteOne({ hash: req.params.hash});
    res.status(200).json({ message: "Credential deleted: ", credentials});
});


module.exports = {getLogs, getLog, createLogs, updateLogs, deleteLogs};