const mongoose = require('mongoose');

const propsectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    steam64id: {
        type: String,
        required: true
    },
    enrollment: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Prospect', propsectSchema);
