const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');

const port = 8080;

// dont show the log when its test
if (process.env.NODE_ENV !== 'test') {
    // use morgan to log at command line
    app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
};

/*
// This is middleware called for all routes.
// Middleware takes three parameters
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});
*/

// Add a route
app.get("/", (req, res) => {
    const data = {
        data: {
            msg: "Hello World"
        }
    };

    res.json(data);
});

app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

app.post("/user", (req, res) => {
    res.status(201).json({
        data: {
            msg: "Got a POST request, sending back 201 Created"
        }
    });
});

app.put("/user", (req, res) => {
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    res.status(204).send();
});

app.get("/hello/:msg", (req, res) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));