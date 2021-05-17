//Require mysql
const mysql = require("mysql");

// Set database connection credentials. MAMP för apache-server och Sequel Pro för db-interface.
const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "api",
  socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
};

// Create a MySQL pool that allows multiple connections
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;

//https://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-connect-a-database--cms-31699
