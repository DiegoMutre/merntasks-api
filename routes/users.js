// Routes for users
const express = require("express");
const { check } = require("express-validator");
const { createUser } = require("../controllers/usersController");
const router = express.Router();

// /api/users
router.post(
    "/",
    [
        check("name", "The name is required").not().isEmpty(),
        check("email", "Add a valid email").isEmail(),
        check(
            "password",
            "Password must be at least 6 characters long"
        ).isLength({ min: 6 }),
    ],
    createUser
);

module.exports = router;
