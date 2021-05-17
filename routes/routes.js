//Require packages/libraries
const _ = require("lodash");
const pool = require("../data/config");

//Lodash lib is used for generating random number between 0 & 1023
const router = (app) => {
  app.get("/api/random", (req, res) => {
    const tal = _.random(0, 1023);
    res.send({
      number: tal,
    });
  });

  //Route parameters are named URL segments that are used to capture the value
  app.get("/api/random/:num", (req, res) => {
    const tal = _.random(0, req.params.num);
    res.send({
      number: tal,
    });
  });

  //JS-function for counting vowels in word from formfield
  countVowels = (text) => {
    let counter = 0;

    for (let letter of text.toLowerCase()) {
      if ("aeiouyåäö".includes(letter)) {
        counter++;
      }
    }
    return counter;
  };

  //Post request displays result of vowel-count
  app.post("/api/words", (req, res) => {
    const { name } = req.body;
    res.send({
      vowelscount: `${countVowels(name)}`,
    });
  });

  //---------------- LABB2 --------------------

  // Create new user
  app.post("/add-user", (request, response) => {
    pool.query("INSERT INTO users SET ?", request.body, (error, result) => {
      if (error) throw error;

      response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });

  //Read all users from MySQL db
  app.get("/users", (req, res) => {
    pool.query("SELECT * FROM users", (error, result) => {
      if (error) throw error;

      res.send(result);
    });
  });

  // Read a single user by ID
  app.get("/users/:id", (req, res) => {
    const { id } = req.params;

    pool.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
      if (error) throw error;

      res.send(result);
    });
  });

  // Update an existing user
  app.put("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query(
      "UPDATE users SET ? WHERE id = ?",
      [req.body, id],
      (error, result) => {
        if (error) throw error;

        res.send({ message: "User updated successfully." });
      }
    );
  });

  // Delete a user
  //curl -X DELETE http://localhost:3002/users/7
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
      if (error) throw error;

      res.send("User deleted.");
    });
  });

  let count = 0;
  app.get("/counter/add", (req, res) => {
    count++;
    res.send({ success: true });
  });

  app.get("/counter/show", (req, res) => {
    res.send({ count });
  });
};

module.exports = router;
