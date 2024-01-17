const express = require("express");
const { getTopics, getAPI } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
} = require("./controllers/articles.controller");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getAPI);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ msg: "invalid ID: 400 Bad request" });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

module.exports = app;
