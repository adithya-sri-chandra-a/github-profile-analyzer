const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const githubRoutes = require("./routes/github.routes.js");

app.use("/api", githubRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server Running");
}); 