const mongoose = require("mongoose");
const db = mongoose.connection;
require("dotenv").config({ path: "variables.env" });

// Connect to DB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
        console.log("Successfully connected to the database");
    } catch (error) {
        console.error(error);
        process.exit(1); // Close the application
    }
};

module.exports = connectDB;
