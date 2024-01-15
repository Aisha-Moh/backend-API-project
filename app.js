const express = require("express");
const { getTopics, getAPI } = require("./controllers/topics.controller");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api", getAPI);

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

module.exports = app;
