const { validationResult } = require("express-validator");
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const project = new Project(req.body);
        // Save the creator
        project.creator = req.user.id;
        await project.save();
        res.json(project);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};

exports.getProjectsByUser = async (req, res) => {
    try {
        const projects = await Project.find({ creator: req.user.id }).sort({
            created_at: -1,
        });
        res.json(projects);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};

exports.updateProjectById = async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Create new project to update
    const { name } = req.body;
    const newProject = {};
    if (name) {
        newProject.name = name;
    }

    try {
        // TODO: Check project id
        // TODO: Check project creator
        // TODO: Update the project
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};
