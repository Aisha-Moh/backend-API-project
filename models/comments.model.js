const db = require("../db/connection");
const fs = require("fs/promises");
const endpoints = require("../endpoints.json");
const comments = require("../db/data/test-data/comments");
const articles = require("../db/data/test-data/articles");

module.exports.fetchCommentsByArticleId = (
  article_id,
  sort_by = "created_at",
  order = "desc"
) => {
  return db
    .query(
      `SELECT * FROM comments WHERE article_id = $1 ORDER BY ${sort_by} ${order}`,
      [article_id]
    )
    .then(({ rows }) => {
      return rows;
    });
};

module.exports.insertComment = (comments, article_id) => {
  return db
    .query(
      `INSERT INTO comments (author, body, article_id) VALUES ($1, $2, $3) RETURNING *`,
      [comments.username, comments.body, article_id]
    )
    .then(({ rows }) => {
      console.log(rows);
      return rows[0];
    });
};
