const express = require("express");
const connectDB = require("./config/db");

// Create server
const app = express();

// Connect to Database
connectDB();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
