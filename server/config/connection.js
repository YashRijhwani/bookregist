// connection.js

const mongoose = require('mongoose');
require('dotenv').config();

// Set mongoose options
mongoose.set('strictQuery', false);

const MONGODB_URI  = process.env.MONGODB_URI;

// console.log('MONGODB_URI:', MONGODB_URI);


const connection = async () => {
    try {
        await mongoose.createConnection(MONGODB_URI || 'mongodb://localhost/googlebooks', {
            useNewUrlParser: true,
            useUnifiedTopology: true,       
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};

module.exports = { connection };
