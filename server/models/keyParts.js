const mongoose = require("mongoose");

const keyPart1 = mongoose.model('firstKey', {
    _id: {
        type: String,
        required: true,
        trim: 1
    },
    key: {
        type: String,
        required: true,
        trim: 1
    }
});

const keyPart2 = mongoose.model('secondKey', {
    _id: {
        type: String,
        required: true,
        trim: 1
    },
    key: {
        type: String,
        required: true,
        trim: 1
    }
});

module.exports = {
    keyPart1,
    keyPart2
}