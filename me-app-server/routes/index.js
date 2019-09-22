const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/texts.sqlite');
const jwt = require('jsonwebtoken');

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

function checkToken(req, res, next) {
    const token = req.headers['x-access-token'];

    jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
        if (!err) {
            res.status(401).json({ error: "token doesnt exist" });
        } 

        next();
    });
}

router.post('/register', (req, res) => {
    insertDb(req.body)
});

router.post('/login', (req, res) => {
    db.get("SELECT password FROM users WHERE email = ? ", 
        req.body.email, (err, row) => {
            if (err) {
                return err;
            } else if (row === undefined) {
                return "error";
            }
    
            bcrypt.compare(req.body.password, row.password, function(err, encrypted) {
                if (encrypted) {
                    const payload = { email: `${req.body.email}` };
                    const secret = process.env.JWT_SECRET || "hemligakorvmojjar";
                    
                    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
                    
                    return res.status(200).json({hemlighet: token, username: req.body.email});
                }
                return res.status(500).json({ error: 'Bcrypt error' });
            });
        })
});

router.get("/pages/:page", (req, res, next) => {
    const page = req.params.page;
 
    db.get("SELECT content FROM pages WHERE title = ?",
        page,
        (err, row) => {
            if (!err) {
                return res.status(200).json({ about: row.content });
            }
            //return res.status(200).json({ about: row.data });
        }
    )
});

router.post("/pages/:page", 
    (req, res, next) => checkToken(req, res, next), 
    (req, res) => {
    
    const page = req.params.page;

    db.run("INSERT OR REPLACE INTO pages(title, content) VALUES(?, ?)",
        page, 
        req.body.data,
        (err, row) => {
            if (!err) {
                console.log("worked!");
                //return res.status(200).json({ about: row.content });
            }
            //return res.status(200).json({ about: row.data });
        }
    )
});


/*router.post("/test", (req, res) => {
    db.run("INSERT OR REPLACE INTO pages(content) WHERE title = ?",
        page, 
        (err) => {
            if (err) {
                return "Something went wrong!";
            }
            return "User succefully created";
        }

    } catch (e) {
        console.log("error", e);
    } finally {
        console.log("This is done");
    } 
});*/

/*
db.get("SELECT content FROM pages WHERE title = ? ",
    "about", (err, row) => {
        if (err) {
            return err;
        } else if (row === undefined) {
            return "error";
        }
        return res.status(200).json({ about: req.body });
    }
)
*/


module.exports = router;