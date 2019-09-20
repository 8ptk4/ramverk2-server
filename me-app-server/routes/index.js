const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');

async function insertDb(values) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(values.password, salt);

        db.run("INSERT INTO users (username, email, password, birthdate) VALUES (?, ?, ?, ?)",
            values.username,
            values.email,
            hash,
            values.personalNumber, (err) => {
                if (err) {
                    return "Something went wrong!";
                }
                return "User succefully created";
            });

    } catch (e) {
        console.log("error", e);
    } finally {
        console.log("This is done");
    } 
};


router.post('/register', (req, res) => {
    insertDb(req.body)
});

router.get("/hello/:msg", (req, res, next) => {
    const data = {
        data: {
            msg: req.params.msg
        }
    };

    res.json(data);
});


module.exports = router;