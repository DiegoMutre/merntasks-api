const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Enable 'express-json'
app.use(express.json({ extended: true }));

// Connect to Database
connectDB();

const PORT = process.env.PORT || 4000;

// Routes for users
app.use("/api/users", require("./routes/users"));

// Routes for auth
app.use("/api/auth", require("./routes/auth"));

// Routes for projects
app.use("/api/projects", require("./routes/projects"));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
