// Routes for users
const express = require("express");
const { createUser } = require("../controllers/usersController");
const router = express.Router();

// /api/users
router.post("/", createUser);

module.exports = router;
