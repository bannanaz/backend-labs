const express = require("express"),
  path = require("path"),
  app = express();

const bodyParser = require("body-parser");
const morgan = require("morgan");
const port = 3002;
const routes = require("./routes/routes");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

routes(app);

app.get("/", (req, res) => {
  res.sendFile("./public/index.html", { root: __dirname });
});

app.get("/api/words", (req, res) => {
  res.sendFile("./public/words.html", { root: __dirname });
});

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
