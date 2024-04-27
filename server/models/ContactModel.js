const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    // Add any other fields as needed
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
