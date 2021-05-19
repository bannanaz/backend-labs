//Require packages/libraries
const _ = require("lodash"),
  pool = require("../data/config");

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

  // Update existing user
  app.put("/users/:id", (req, res) => {
    const { id } = req.params;

    pool.query(
      "UPDATE users SET ? WHERE id = ?",
      [req.body, id],
      (error, result) => {
        if (error) throw error;

        res.send({ message: "User updated successfully." });
      }
    );
  });

  // Delete user
  app.delete("/users/:id", (req, res) => {
    const { id } = req.params;

    pool.query("DELETE FROM users WHERE id = ?", id, (error, result) => {
      if (error) throw error;

      res.send("User deleted.");
    });
  });

  // Endpoint for counter add number
  let count = 0;
  app.get("/counter/add", (req, res) => {
    count++;
    res.send({ success: true });
  });

  // Endpoint for counter show number
  app.get("/counter/show", (req, res) => {
    res.send({ count });
  });

  //---------------- LABB3 --------------------

  function toFahrenheit(celsius) {
    let fahrenheit = 1.8 * celsius + 32;
    return fahrenheit;
  }

  app.post("/toFahrenheit", (req, res) => {
    const { name } = req.body;
    res.send({
      fahrenheit: toFahrenheit(name),
    });
  });
};

module.exports = router;
