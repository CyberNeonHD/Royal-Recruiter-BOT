const mongoose = require('mongoose');

const seedSchema = new mongoose.Schema({
    seed: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    }

});

module.exports = mongoose.model('SeedLink', seedSchema, 'SeedLink');
