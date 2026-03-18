const express = require("express");
const cors = require("cors");

const topicRoutes = require("./routes/topics");
const commentRoutes = require("./routes/comments");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/topics", topicRoutes);
app.use("/api/comments", commentRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
