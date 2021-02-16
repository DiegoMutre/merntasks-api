const Project = require("../models/Project");
const Task = require("../models/Task");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
};
