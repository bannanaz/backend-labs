//Express = node.js framework
//Require packages and set the port
const express = require("express"),
  path = require("path"),
  app = express(),
  port = 3002,
  bodyParser = require("body-parser"),
  morgan = require("morgan"),
  routes = require("./routes/routes");

//Middlewares:
//Parses the JSON, string and URL encoded data submitted using HTTP POST request.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Logs requests
app.use(morgan("dev"));

//Static serves static files, ex. css, images, html
//Path is fo routing, __dirname is for the directorys path
app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

//replaces app.get() for routes in route-file
routes(app);

//get requests for static files
app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.get("/api/words", (req, res) => {
  res.sendFile("./public/words.html", { root: __dirname });
});

app.get("/add-user", (req, res) => {
  res.sendFile("./public/users.html", { root: __dirname });
});

// Starts the server
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});

//Tutorials:
//(Tutorialspoint) https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-set-up-the-server--cms-31698
//(Net Ninja) https://www.youtube.com/watch?v=zb3Qk8SG5Ms&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU
