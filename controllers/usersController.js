const User = require("../models/User");
const bcryptjs = require("bcryptjs");

exports.createUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validate unique user
        let user = await User.findOne({ email });

        if (user) {
            return res.status(404).json({ msg: "User already exists" });
        }

        // Create new user
        user = new User(req.body);

        // Hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt);

        // Save new user
        await user.save();

        res.json({ msg: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ msg: "There was a mistake" });
    }
};
