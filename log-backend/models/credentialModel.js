const mongoose = require('mongoose');   

//Schema for the credentials collection in MongoDB using Mongoose
const credentialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"]
    },
    hash: {
        type: String,
        required: [true, "Please provide a hash"]
    },
    signedReference: {
        type: String,
        required: [true, "Please provide a signed reference"]
    },
    keyName: {
        type: String,
        required: [true, "Please provide a key name"]
    },
    signAgent: {
        type: String,
        required: [true, "Please provide a key name"]
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Credentials", credentialSchema);