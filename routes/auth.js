// Routes for auth
const express = require("express");
const { check } = require("express-validator");
const { authUser, getUser } = require("../controllers/authController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// /api/auth
router.post("/", [authUser]);

router.get("/", authentication, getUser);

module.exports = router;
