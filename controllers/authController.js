const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

exports.authUser = async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ msg: "User doesn't exist" });
        }

        // Check if password is correct
        const correctPass = await bcryptjs.compare(password, user.password);
        if (!correctPass) {
            return res.status(400).json({ msg: "Incorrect Password" });
        }

        const payload = {
            user: {
                id: user.id,
            },
        };

        // Create and sign JWT
        jwt.sign(
            payload,
            process.env.SECRET,
            {
                expiresIn: 3600,
            },
            (error, token) => {
                if (error) {
                    throw new Error(error);
                }
                res.json({ token });
            }
        );
    } catch (error) {
        console.error(error);
    }
};

exports.getUser = async (req, res) => {
    try {
        // Get user by id
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};
