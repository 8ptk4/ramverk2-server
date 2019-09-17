const express = require("express");
const app = express();

const port = 8080;

// Add a route
app.get("/", (req, res) => {
    res.send("Hello World");
});

app.get("/test", (req, res) => {
    res.send("Testar lite");
});

// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));