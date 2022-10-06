const mongoose = require('mongoose');

const liveSchema = new mongoose.Schema({
    live: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('LiveLink', liveSchema, 'LiveLink');
