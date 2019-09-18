const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require('morgan');
const cors = require('cors');

const index = require('./routes/index');
const hello = require('./routes/hello');

const port = 8080;

app.use(cors());

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

/*
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

*/



app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title": err.message,
                "detail": err.message
            }
        ]
    });
});


app.use('/', index);
app.use('/hello', hello);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// Start up server
app.listen(port, () => console.log(`Example API listening on port ${port}!`));