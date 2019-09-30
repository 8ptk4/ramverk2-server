// Import the dependencies for testing
process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");
const db = require("../../db/database.js");
const jwt = require("jsonwebtoken");

chai.use(chaiHttp);
chai.should();

let token = "";

describe("REGISTER USER", () => {
  before(() => {
    return new Promise(resolve => {
      db.run("DELETE FROM users", err => {
        if (err) {
          console.error("Could not empty test DB table (users)");
        }

        resolve();
      });
    });
  });

  it("Should successfully register a user", done => {
    const userCredentials = {
      username: "test",
      email: "testUser@test.com",
      password: "testtest",
      personalNumber: "1984/04/09"
    };

    chai
      .request(server)
      .post("/register")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(201);

        done();
      });
  });

  it("should fail if no name provided ", done => {
    const userCredentials = {
      email: "testUser@test.com",
      password: "testtest",
      personalNumber: "1984/04/09"
    };

    chai
      .request(server)
      .post("/register")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(401);

        done();
      });
  });

  it("should fail if no email provided ", done => {
    const userCredentials = {
      username: "test",
      password: "testtest",
      personalNumber: "1984/04/09"
    };

    chai
      .request(server)
      .post("/register")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(401);

        done();
      });
  });
});

describe("LOGIN USER", () => {
  it("Should successfully login user", done => {
    const userCredentials = {
      email: "testUser@test.com",
      password: "testtest"
    };

    chai
      .request(server)
      .post("/login")
      .send(userCredentials)
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  if (
    ("should not login user",
    done => {
      const userCredentials = {
        email: "testUser@fel.com",
        password: "testasdasdtest"
      };

      chai
        .request(server)
        .post("/login")
        .send(userCredentials)
        .end((err, res) => {
          res.should.have.status(400);

          done();
        });
    })
  );
});

///// TEST FOR HOME ROUTE

describe("GET /", () => {
  before(() => {
    return new Promise(resolve => {
      const data = {
        title: "about",
        content: "test content"
      };

      db.run(
        "INSERT OR REPLACE INTO pages(title, content) VALUES(?, ?)",
        data.title,
        data.content,
        err => {
          if (err) {
            console.error("Could not create new page!");
          }

          resolve();
        }
      );
    });
  });

  it("Should get the contents of the about page", done => {
    chai
      .request(server)
      .get("/")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("string");
        done();
      });
  });
});

///////////////////////////

///// TEST FOR PAGE TITLES

describe("GET /titles", () => {
  before(() => {
    return new Promise(resolve => {
      const data = {
        title: "about",
        content: "test content"
      };

      db.run(
        "INSERT OR REPLACE INTO pages(title, content) VALUES(?, ?)",
        data.title,
        data.content,
        err => {
          if (err) {
            console.error("Could not create new page!");
          }

          resolve();
        }
      );
    });
  });
  it("SHOULD GET ALL PAGE TITLES", done => {
    chai
      .request(server)
      .get("/titles")
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });
});

describe("GET /titles", () => {
  before(() => {
    return new Promise(resolve => {
      db.run("DELETE FROM pages", err => {
        if (err) {
          console.error("Could not empty test DB table (users)");
        }

        resolve();
      });
    });
  });
  it("SHOULD NOT GET ANY PAGE TITLES", done => {
    chai
      .request(server)
      .get("/titles")
      .end((err, res) => {
        res.should.have.status(204);

        done();
      });
  });
});

/////////////////////////////////////////////////

///////// REPORTS
describe("POST /reports", () => {
  before(() => {
    return new Promise(resolve => {
      db.run("DELETE FROM pages", err => {
        if (err) {
          console.error("Could not empty test DB table (pages)");
        }

        resolve();
      });
    });
  });

  it("Create report should work with token", done => {
    const data = {
      title: "new",
      content: "content"
    };

    const payload = { email: "testUser@test.com" };

    const token = jwt.sign(payload, "hemligakorvmojjar", { expiresIn: "1h" });
    chai
      .request(server)
      .post("/reports")
      .set("X-Access-Token", token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  it("Create report should not work without token", done => {
    const data = {
      title: "new",
      content: "content"
    };

    const token = "nejhdu";
    chai
      .request(server)
      .post("/reports")
      .set("X-Access-Token", token)
      .send(data)
      .end((err, res) => {
        res.should.have.status(401);

        done();
      });
  });
});

describe("POST /reports/week/:kmom", () => {
  before(() => {
    return new Promise(resolve => {
      const data = {
        title: "about",
        content: "test content"
      };

      db.run(
        "INSERT OR REPLACE INTO pages(title, content) VALUES(?, ?)",
        data.title,
        data.content,
        err => {
          if (err) {
            console.error("Could not create new page!");
          }

          resolve();
        }
      );
    });
  });

  it("Should be able to find report that exists", done => {
    const title = "about";
    chai
      .request(server)
      .get(`/reports/week/${title}`)
      .end((err, res) => {
        res.should.have.status(200);

        done();
      });
  });

  it("Should be able to find report that doesnt exsist", done => {
    const title = "abouta";
    chai
      .request(server)
      .get(`/reports/week/${title}`)
      .end((err, res) => {
        res.should.have.status(204);

        done();
      });
  });
});
