const mongoose = require('mongoose');

const propsectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    remainingTime: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Prospect', propsectSchema);