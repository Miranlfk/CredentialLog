const mongoose = require('mongoose');

//Schema for the user collection in MongoDB using Mongoose
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, 'Please provide a password']
    },
    refreshToken: {
        type: String
    },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);