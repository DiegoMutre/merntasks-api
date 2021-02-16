const express = require("express");
const { createProject } = require("../controllers/projectsController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// api/projects
router.post("/", authentication, createProject);
module.exports = router;
