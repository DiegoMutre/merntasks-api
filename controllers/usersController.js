const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.createUser = async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

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

        // Create and sign JWT
        const payload = {
            user: {
                id: user.id,
            },
        };

        // Sign JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) throw error;

                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(404).json({ msg: "There was a mistake" });
    }
};
