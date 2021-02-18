const Project = require("../models/Project");
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
    // Check for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Get project by id
        const hasProject = await Project.findById(req.body.project_id);
        if (!hasProject) {
            return res.status(404).json({ msg: "Project not found" });
        }

        // Check if the user is the owner
        if (hasProject.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No authorized" });
        }

        // Create new task
        const task = new Task(req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};

exports.getTasksByProject = async (req, res) => {
    try {
        // Get project by id
        const project = await Project.findById(req.query.project_id);

        if (!project) {
            return res.status(401).json({ msg: "Project not found" });
        }

        // Check if the user is the project owner
        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No authorized" });
        }

        // Get tasks by project_id
        const tasks = await Task.find({
            project_id: req.query.project_id,
        }).sort({ created_at: -1 });
        if (!tasks) {
            return res.status(404).json({ msg: "Tasks not found" });
        }
        res.json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const { project_id, name, state } = req.body;

        const project = await Project.findById(project_id);

        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No authorized" });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        let taskToUpdate = {};

        if (name) {
            taskToUpdate.name = name;
        }

        if (state) {
            taskToUpdate.state = state;
        }

        taskToUpdate = await Task.findOneAndUpdate(
            { _id: req.params.id },
            { $set: taskToUpdate },
            { new: true }
        );
        res.json(taskToUpdate);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const { project_id } = req.body;

        const project = await Project.findById(project_id);

        if (project.creator.toString() !== req.user.id) {
            return res.status(401).json({ msg: "No authorized" });
        }

        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ msg: "Task not found" });
        }

        await Task.findOneAndRemove({ _id: req.params.id });
        res.json({ msg: "Task deleted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "There was a mistake" });
    }
};
