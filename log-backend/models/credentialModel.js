const mongoose = require('mongoose');   

const credentialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    hash: {
        type: String,
        required: [true, "Please provide a hash"]
    },
    keyName: {
        type: String,
        required: [true, "Please provide a key name"]
    },
    trustPolicy: {
        type: String,
        required: [true, "Please provide a trust policy"]
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Credentials", credentialSchema);