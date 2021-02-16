const express = require("express");
const { check } = require("express-validator");
const { createProject } = require("../controllers/projectsController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// api/projects
router.post(
    "/",
    authentication,
    [check("name", "The name is required").not().isEmpty()],
    createProject
);
module.exports = router;
