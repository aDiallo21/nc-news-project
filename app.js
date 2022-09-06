const express = require("express");
const app = express();

const { getTopics } = require("./controllers/topics.controller");

app.get("/api/topics", getTopics);

app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error" });
});

module.exports = app;
