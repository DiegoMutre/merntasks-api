// Routes for auth
const express = require("express");
const { check } = require("express-validator");
const { authUser, getUser } = require("../controllers/authController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// /api/auth
router.post("/", [
    check("email", "Add a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({
        min: 6,
    }),
    authUser,
]);

router.get("/", authentication, getUser);

module.exports = router;
