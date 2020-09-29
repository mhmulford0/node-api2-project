const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/", async (req, res) => {
  const result = await db.find();
  console.log(result);
  res.status(200).json(result);
});

module.exports = router;
