const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../db/database.js");

const jwt = require("jsonwebtoken");

async function insertDb(values, res) {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(values.password, salt);

  db.run(
    "INSERT INTO users (username, email, password, birthdate) VALUES (?, ?, ?, ?)",
    values.username,
    values.email,
    hash,
    values.personalNumber,
    (err, row) => {
      if (err) {
        return res.status(401).json({ response: "User couldnt be created" });
      }

      return res.status(201).json({ response: "User created successfully" });
    }
  );
}

function checkToken(req, res, next) {
  const token = req.headers["x-access-token"];
  const secret = "hemligakorvmojjar";

  jwt.verify(token, secret, function(err, decoded) {
    if (err) {
      return res.status(401).json({ error: "token doesnt exist" });
    }

    next();
    return undefined;
  });
}

router.post("/register", (req, res) => {
  insertDb(req.body, res);
});

router.get("/", (req, res, next) => {
  db.get("SELECT content FROM pages WHERE title = ?", "About", (err, row) => {
    if (!err) {
      return res.status(200).json({ ...row }.content);
    }
  });
});

router.post("/login", (req, res) => {
  db.get(
    "SELECT password FROM users WHERE email = ? ",
    req.body.email,
    (err, row) => {
      if (err) {
        return err;
      } else if (row === undefined) {
        return "error";
      }

      bcrypt.compare(req.body.password, row.password, function(err, encrypted) {
        if (encrypted) {
          const payload = { email: `${req.body.email}` };
          const secret = "hemligakorvmojjar";

          const token = jwt.sign(payload, secret, { expiresIn: "1h" });

          return res
            .status(200)
            .json({ hemlighet: token, username: req.body.email });
        }
        return res.status(500).json({ error: "Bcrypt error" });
      });
    }
  );
});

router.get("/reports/week/:kmom", (req, res, next) => {
  const title = req.params.kmom;

  db.get("SELECT content FROM pages WHERE title = ?", title, (err, rows) => {
    if (err) {
      return res.status(404).json({ error: "Cant find the page" });
    } else if (rows === undefined) {
      return res.status(204).json({ message: "no data to be found" });
    }
    res.status(200).json({ about: rows.content });
  });
});

router.post(
  "/reports/",
  (req, res, next) => checkToken(req, res, next),
  (req, res) => {
    db.run(
      "INSERT OR REPLACE INTO pages(title, content) VALUES(?, ?)",
      req.body.title,
      req.body.content,
      err => {
        console.log(req.body.title);
        if (err) {
          return res.status(500).json({ error: "Something went wrong" });
        } else if (err == true) {
          return res
            .status(400)
            .json({ error: "What the fuck just happened?" });
        }
        return res.status(200).json({ status: "Everything went ok" });
      }
    );
  }
);

router.get("/titles", (req, res, next) => {
  const sql = "SELECT title FROM pages";

  db.all(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    } else if (rows.length === 0) {
      return res.status(204).json({ message: "no data to be found" });
    }
    res.json({
      status: 200,
      message: "success",
      data: rows
    });
  });
});

module.exports = router;
