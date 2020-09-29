const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/", async (req, res) => {
  const result = await db.find();
  result
    ? res.status(200).json(result)
    : res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const result = await db.findById(id);
  console.log(result);
  result.length > 0
    ? res.status(200).json(result)
    : res
        .status(500)
        .json({ message: "The post with the specified ID does not exist." });
});

module.exports = router;
