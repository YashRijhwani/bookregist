const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// import schema from Book.js
const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: [{
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    bookId: {
        type: String,
        // required: true,
    },
    image: {
        type: String,
        trim: true
    },
    link: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const UserSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
            type: String,
            required: true,
        },
        // set savedBooks to be an array of data that adheres to the bookSchema
        savedBooks: [BookSchema],
    },
    // set this to use virtual below
    {
        toJSON: {
            virtuals: true,
        },
    }
);

// hash user password
UserSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// custom method to compare and validate password for logging in
UserSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `bookCount` with the number of saved books we have
UserSchema.virtual('bookCount').get(function () {
    return this.savedBooks.length;
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
