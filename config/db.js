const mysql = require("mysql2");
console.log("HOST =", process.env.DB_HOST);
console.log("PORT =", process.env.DB_PORT);
console.log("USER =", process.env.DB_USER);
console.log("DB =", process.env.DB_NAME);
console.log("TOKEN =", process.env.GITHUB_TOKEN);
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = connection;