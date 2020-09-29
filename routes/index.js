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


router.post("/", async (req, res) => {
  if (req.body.title || req.body.contents !== undefined) {
    try {
      await db.insert({ title: req.body.title, contents: req.body.contents });
      res.status(201).json({ message: "post added" });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post.",
    });
  }
});

module.exports = router;
