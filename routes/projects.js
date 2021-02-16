const express = require("express");
const { createProject } = require("../controllers/projectsController");
const router = express.Router();

// api/projects
router.post("/", createProject);

module.exports = router;
