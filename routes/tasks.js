const express = require("express");
const { check } = require("express-validator");
const {
    createTask,
    getTasksByProject,
} = require("../controllers/tasksController");
const authentication = require("../middlewares/authentication");
const router = express.Router();

router.post(
    "/",
    authentication,
    [
        check("name", "The name is required").not().isEmpty(),
        check("project_id", "The project is required").not().isEmpty(),
    ],
    createTask
);

router.get("/", authentication, getTasksByProject);

module.exports = router;
