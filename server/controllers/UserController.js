// import user model
const User = require('../models/UserModel');
const Contact = require('../models/ContactModel');
// import sign token function from auth
const { signToken } = require('../utils/auth');

module.exports = {
    // get a single user by either their id or their username
    async getSingleUser({ user = null, params }, res) {
        const foundUser = await User.findOne({
            $or: [{ _id: user ? user._id : params.id }, { username: params.username }],
        });

        if (!foundUser) {
            return res.status(400).json({ message: 'Cannot find a user with this id!' });
        }

        res.json(foundUser);
    },

    // create a user, sign a token, and send it back (to client/src/components/SignUp)
    async createUser({ body }, res) {
        // Check if the user's email already exists
        const existingUser = await User.findOne({ email: body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email is already in use!' });
        }

        // Create a new user if the email doesn't exist
        const user = await User.create(body);

        if (!user) {
            return res.status(400).json({ message: 'Something is wrong!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    // login a user, sign a token, and send it back (to client/src/components/Login)
    // {body} is destructured req.body
    async login({ body }, res) {
        const user = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });
        if (!user) {
            return res.status(400).json({ message: "Can't find this user" });
        }

        const correctPw = await user.isCorrectPassword(body.password);

        if (!correctPw) {
            return res.status(400).json({ message: 'Wrong email or password!' });
        }
        const token = signToken(user);
        res.json({ token, user });
    },

    async sendInquiry({ body }, res) {
        try {
            // Create a new instance of the Inquiry model with the inquiry data
            const newInquiry = new Contact({
                name: body.name,
                email: body.email,
                message: body.message,
                // Add any other fields from the request body as needed
            });

            // Save the new inquiry to the database
            await newInquiry.save();

            // Send a success response
            res.json({ message: 'Inquiry message saved successfully!' });
        } catch (error) {
            console.error("Inquiry submission failed:", error);
            res.status(500).json({ message: 'Failed to save inquiry message to the database. Please try again.' });
        }
    },

    // save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
    // user comes from `req.user` created in the auth middleware function
    async saveBook({ user, body }, res) {
        console.log(user);
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: user._id },
                { $addToSet: { savedBooks: body } },
                { new: true, runValidators: true }
            );
            return res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(400).json(err);
        }
    },
    // remove a book from `savedBooks`
    async deleteBook({ user, params }, res) {
        const updatedUser = await User.findOneAndUpdate(
            { _id: user._id },
            { $pull: { savedBooks: { bookId: params.bookId } } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "Couldn't find user with this id!" });
        }
        return res.json(updatedUser);
    },
};
