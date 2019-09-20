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
            values.username, values.email, hash, 
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

router.post('/login', (req, res) => {
    db.get("SELECT password FROM users WHERE email = ? ", 
        req.body.email, (err, row) => {
            if (err) {
                console.log("Error:", err);
            } else if (row === undefined) {
                console.log("No values in row!!")
            }
    
            bcrypt.compare(req.body.password, row.password, function (err, res) {
                // res innehåller nu true eller false beroende på om det är rätt lösenord.
                console.log("STÄMMER LÖSENORDEN?????", res)
            });
        })
   /*

       db.run("INSERT INTO users (username, email, password, birthdate) VALUES (?, ?, ?, ?)",
            values.username, values.email, hash,
            values.personalNumber, (err) => {
                if (err) {
                    return "Something went wrong!";
                }
                return "User succefully created";
            });

    const myPlaintextPassword = 'longandhardP4$$w0rD';
    const hash = 'superlonghashedpasswordfetchedfromthedatabase';

    bcrypt.compare(myPlaintextPassword, hash, function (err, res) {
        // res innehåller nu true eller false beroende på om det är rätt lösenord.
    });
    */
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