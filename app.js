const express = require("express");
const { getTopics, getAPI } = require("./controllers/topics.controller");
const {
  getArticles,
  getArticleById,
  patchArticleByArticleId,
} = require("./controllers/articles.controller");
const {
  getCommentsByArticleId,
  postCommentByArticleId,
} = require("./controllers/comments.controller");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api", getAPI);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id/comments", getCommentsByArticleId);

app.post("/api/articles/:article_id/comments", postCommentByArticleId);

app.patch("/api/articles/:article_id", patchArticleByArticleId);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "endpoint not found" });
});

app.use((err, req, res, next) => {
  if (err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  if (err.code === "22P02" || err.code === "23502") {
    res.status(400).send({ msg: "Bad request" });
  } else {
    next(err);
  }
});

// app.use((err, req, res, next) => {
//   if (err) {
//     console.log(err);
//   } else {
//     next(err);
//   }
// });
module.exports = app;
