const express = require("express"),
  path = require("path"),
  app = express(),
  bodyParser = require("body-parser");

const port = 3002;
const routes = require("./routes/routes");

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
console.log(path.join(__dirname, "public"));

routes(app);

const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});
