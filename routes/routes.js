//Require packages/libraries
const _ = require("lodash");
const pool = require("../data/config");
const vowels = ["a", "e", "i", "o", "u", "y", "å", "ä", "ö"];

const router = (app) => {
  //Lodash lib is used for generating random number between 0 & 1023.
  app.get("/api/random", (req, res) => {
    const tal = _.random(0, 1023);
    res.send({
      number: tal,
    });
  });

  //Route parameters are named URL segments that are used to capture the value.
  app.get("/api/custom_random/:num", (req, res) => {
    const num = req.params.num;
    const tal = _.random(0, num);
    res.send({
      number: tal,
    });
  });

  //JS-function for counting vowels in word from formfield.
  //https://dev.to/worldclassdev/javascript-algorithms-1-counting-the-vowels-in-a-string-oftext-5ejl
  function countVowels(text) {
    let counter = 0;

    for (let letter of text.toLowerCase()) {
      if (vowels.includes(letter)) {
        counter++;
      }
    }
    return counter;
  }

  //Post request displays result of vowel-count.
  app.post("/api/words", (req, res) => {
    res.send(
      `${req.body.name} contains ${countVowels(req.body.name)} vowel(s)`
    );
  });

  //---------- LABB2 -----------------------

  app.get("/api/counter", (req, res) => {
    res.send({
      message: "hello counter",
    });
  });

  app.get("/users", (req, res) => {
    pool.query("SELECT * FROM users", (error, result) => {
      if (error) throw error;

      res.send(result);
    });
  });

  // Display a single user by ID
  app.get("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query("SELECT * FROM users WHERE id = ?", id, (error, result) => {
      if (error) throw error;

      res.send(result);
    });
  });

  // Add a new user
  app.post("/users", (req, res) => {
    pool.query("INSERT INTO users SET ?", req.body, (error, result) => {
      if (error) throw error;

      res.status(201).send(`User added with ID: ${result.insertId}`);
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

        res.send("User updated successfully.");
      }
    );
  });

  // Delete a user
  app.delete("/users/:id", (req, res) => {
    const id = req.params.id;

    pool.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
      if (error) throw error;

      res.send("User deleted.");
    });
  });
};

module.exports = router;
