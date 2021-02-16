const Project = require("../models/Project");

exports.createProject = async (req, res) => {
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
