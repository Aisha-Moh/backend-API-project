const db = require("../db/connection");
const fs = require("fs/promises");
const endpoints = require("../endpoints.json");
const comments = require("../db/data/test-data/comments");
const articles = require("../db/data/test-data/articles");
const users = require("../db/data/test-data/users");

module.exports.fetchUsers = () => {
  return db.query(`SELECT * FROM users`).then(({ rows }) => {
    return rows;
  });
};
