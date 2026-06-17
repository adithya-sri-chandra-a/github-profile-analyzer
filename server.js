const express = require("express");
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const app = express();

app.use(express.json());

const githubRoutes = require("./routes/github.routes.js");

app.use("/api", githubRoutes);

app.get("/", (req, res) => {
  res.send("GitHub Profile Analyzer API is running");
});

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});