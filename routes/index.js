const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/", async (req, res) => {
  try {
    const result = await db.find();
    res.status(200).json(result);;
  } catch (error) {
    res.status(500).json({  error: `${error}`  });;
  }
  
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.findById(id);
    result.length > 0
    ? res.status(200).json(result)
    : res
        .status(500)
        .json({ message: "The post with the specified ID does not exist." });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "The post with the specified ID does not exist."  });;
  }
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await db.findCommentById(id);
    result.length > 0
    ? res.status(200).json(result)
    : res
        .status(500)
        .json({ message: "The post with the specified ID does not exist." });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "The post with the specified ID does not exist."  });;
  }
});

module.exports = router;
