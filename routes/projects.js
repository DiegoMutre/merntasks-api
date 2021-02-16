const express = require("express");
const { check } = require("express-validator");
const {
    createProject,
    getProjectsByUser,
} = require("../controllers/projectsController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

// api/projects
router.post(
    "/",
    authentication,
    [check("name", "The name is required").not().isEmpty()],
    createProject
);

router.get("/", authentication, getProjectsByUser);
module.exports = router;
