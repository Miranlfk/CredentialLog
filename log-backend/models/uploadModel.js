const mongoose = require('mongoose');   

//Schema for the file collection in MongoDB using Mongoose
const uploadSchema = new mongoose.Schema({
    name: {
        type: String, // Changed type to Buffer
        required: [true, "Please provide a name"]
    },
    file: {
        type: Buffer, // Changed type to Buffer
        required: [true, "Please provide a name"]
    },
    hash: {
        type: String,
        required: [true, "Please provide a hash"]
    }
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Uploads", uploadSchema);