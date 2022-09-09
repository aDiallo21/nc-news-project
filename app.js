const express = require("express");
const app = express();
const { getTopics } = require("./controllers/topics.controller");
const {
  getArticleById,
  patchVotes,
  addCommentCount,
} = require("./controllers/articles.controller");
const { getUsers } = require("./controllers/users.controller");

app.use(express.json());

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/users", getUsers);
app.patch("/api/articles/:article_id", patchVotes);

// psql error handler
app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "Bad request" });
  }
  if (err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else next(err);
});

// custom error handler
app.use((err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
