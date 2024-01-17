const db = require("../db/connection");
const fs = require("fs/promises");
const endpoints = require("../endpoints.json");

module.exports.fetchTopics = () => {
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};
