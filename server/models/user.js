const mongoose = require("mongoose");

const User = mongoose.model("user", {
    _id: {
        type: String,
        required: true,
        trim: 1
    },
    userID: {
        type: String,
        required: true,
        trim: 1
    },
    password: {
        type: String,
        required: true,
        trim: 1
    },
    secret: {
        type: String,
        required: false,
        trim: 1
    }
});

module.exports = {
    User
};