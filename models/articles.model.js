const db = require("../db/connection");
const fs = require("fs/promises");
const endpoints = require("../endpoints.json");
const articles = require("../db/data/test-data/articles");

module.exports.fetchArticleById = (id) => {
  return db
    .query(
      `SELECT * FROM articles 
        WHERE article_id = $1`,
      [id]
    ) // could do SELECT articles.* to refactor above
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "endpoint not found" });
      }
      return rows[0];
    });
};

module.exports.fetchArticles = (
  sort_by = "created_at",
  order = "desc",
  topic = ""
) => {
  const validTopicQueries = ["cats", "mitch", "paper", ""];
  if (!validTopicQueries.includes(topic)) {
    return Promise.reject({ status: 400, msg: "invalid topic query" });
  }
  let queryStr = `SELECT articles.article_id, articles.author, articles.title, articles.topic, articles.created_at, articles.votes, articles.article_img_url,
    COUNT(comments.article_id) AS comment_count 
    FROM articles
    LEFT JOIN comments on articles.article_id = comments.article_id
    `;

  const queryValues = [];

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }
  queryStr += ` GROUP BY articles.article_id ORDER BY ${sort_by} ${order}`;

  return db.query(queryStr, queryValues).then(({ rows }) => {
    return rows;
  });
};

module.exports.updateVote = (votes, article_id) => {
  return db
    .query(
      `UPDATE articles SET votes = votes + $1 WHERE article_id = $2  RETURNING *`,
      [votes, article_id]
    )
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: "endpoint not found" });
      }
      return rows[0];
    });
};
