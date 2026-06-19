const express = require("express");
const path = require("path");
if(process.env.NODE_ENV !== "production"){
  require("dotenv").config();
}

const app = express();
app.set("view engine", "ejs");
app.set("views",path.join(__dirname,"views"));
app.use (express.urlencoded({extendes:true}));
app.use(express.json());

const githubRoutes = require("./routes/github.routes.js");

app.use("/api", githubRoutes);

app.get("/",(req,res)=> {
  res.render("index.ejs");
});

app.post("/analyze", async (req,res)=>{
   const { username } = req.body;
   res.redirect(`/api/analyze/${username}`);
});

app.listen(process.env.PORT, () => {
  console.log("Server Running");
});