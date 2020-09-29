const express = require("express");
const postRouter = require("./routes");
const app = express();
app.use(express.json());

app.use("/api/posts", postRouter);

app.get("/", (req, res) => {
  res.send("<h1>Welcome to the API</h1>");
});

app.listen(3000, () => {
  console.log("Server Running on port 3000");
});
