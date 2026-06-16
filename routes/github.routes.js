const express = require("express");
const router = express.Router();

const {
  analyzeProfile,
  getAllProfiles,
  getSingleProfile
} = require("../controllers/github.controllers.js");

router.get("/analyze/:username", analyzeProfile);

router.get("/profiles", getAllProfiles);

router.get("/profile/:username", getSingleProfile);

module.exports = router;