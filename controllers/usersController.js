const User = require("../models/User");

exports.createUser = async (req, res) => {
    try {
        // Create new user
        let user = new User(req.body);

        // Save new user
        await user.save();

        res.json("User created successfully");
    } catch (error) {
        console.error(error);
        res.status(404).json("There was a mistake");
    }
};
