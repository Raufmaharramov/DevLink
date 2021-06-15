const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => res.send("profile router"));

module.exports = router;
