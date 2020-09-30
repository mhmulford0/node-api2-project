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

// router.post("/:id/comments", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const lookupPost = await db.findById(id);
//     if (lookupPost.length === 1) {
//       const newComment = await db.update(id, { text: req.body.text });
//       res.status(201).json({ id: id, data: newComment });
//     } else {
//       res
//         .status(404)
//         .json({ message: "The post with the specified ID does not exist." });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });


router.delete("/:id", async (req, res) => {
  const {id} = req.params
  try {
    const removedPost = await db.remove(id);
    console.log(removedPost)
    if (removedPost !== 0) {
    res.status(200).json({message: 'item removed'})
    } else {
      res.status(404).json({message: 'no post with provided ID'})
    }
  } catch (error) {
    console.log(error)
  }
  
})

router.put("/:id", async (req, res) => {
  const {id} = req.params

  try {
    const updatedPost = await db.update(id, {contents: req.body.contents})

    if (updatedPost === 1) {
      res.status(201).json({message: "post updated"})
    } else {
      res.status(404).json({message: "post not found"})
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
