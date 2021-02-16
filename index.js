const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 4000;

// Routes for users
app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});