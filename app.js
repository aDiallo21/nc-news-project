const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topics.controller");
const { getArticleById } = require("./controllers/articles.controller");

app.get("/api/topics", getTopics);
app.get("/api/articles/:article_id", getArticleById);

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
