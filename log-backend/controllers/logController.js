const asyncHandler = require("express-async-handler");
const Credentials = require("../models/credentialModel");


//@desc Get all credentials
//@route GET /api/logs
//@access private 
const getLogs = asyncHandler(async (req, res) => {   
    const credentials = await Credentials.find();
    res.status(200).json({ message: "All Credentials:", credentials });
});


//@desc Get a Credential using hash
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

//@desc Update a Credential using hash as key
//@route PUT /api/logs
//@access private 
const updateLogs = asyncHandler(async (req, res) => {
    // if (req.body.hasOwnProperty('hash')) {
    //     // Log unauthorized attempt to update hash field
    //     console.error('Unauthorized attempt to update field.');
    //     res.status(403);
    //     throw new Error("Unauthorized attempt to update field.");
    // }
    // if (Object.keys(req.body).length > 0) {
    //     // Log unauthorized attempt to update fields
    //     console.error('Unauthorized attempt to update fields.');
    //     res.status(403).json({ error: 'Unauthorized' });
    //     return;
    // }

    // Check if the request body contains fields that should not be updated
    const fieldsNotAllowedToUpdate = ['hash', 'keyName', 'trustPolicy'];
    const updateData = { ...req.body };

    for (const field of fieldsNotAllowedToUpdate) {
        if (updateData.hasOwnProperty(field)) {
            // Log unauthorized attempt to update certain fields
            console.error(`Unauthorized attempt to update ${field} field.`);
            delete updateData[field]; // Remove the field from updateData
        }
    }

    // If there are no fields to update after filtering, respond with an error
    if (Object.keys(updateData).length === 0) {
        res.status(403);
        throw new Error("Unauthorized attempt to update fields.");
    }

    const credentials = await Credentials.find({ hash: req.params.hash});
    if (!credentials || credentials.length === 0) {
        res.status(404);
        throw new Error("Credential not found");
    }
    // const { hash, ...updateData } = req.body;
    const updatedCredentials = await Credentials.findOneAndUpdate(
        { hash: req.params.hash},
        updateData,
        { new: true }
    )
    res.status(200).json({ message: "Credential updated: ", updatedCredentials});
});

//@desc Delete a Credential
//@route DELETE /api/logs
//@access private 
const deleteLogs = asyncHandler(async (req, res) => {

    if (Object.keys(req.body).length > 0) {
        // Log unauthorized attempt to update fields
        console.error('Unauthorized attempt to update fields.');
        res.status(403).json({ error: 'Unauthorized' });
        return;
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