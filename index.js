const express = require("express");

// Create server
const app = express();

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
});
