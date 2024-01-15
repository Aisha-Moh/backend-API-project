const db = require("../db/connection");

module.exports.fetchTopics = () => {
  console.log("<< in the model");
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};
