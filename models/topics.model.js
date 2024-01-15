const db = require("../db/connection");
const fs = require("fs/promises");
const endpoints = require("../endpoints.json");

module.exports.fetchTopics = () => {
  //console.log("<< in the model");
  return db.query(`SELECT * FROM topics`).then(({ rows }) => {
    return rows;
  });
};
// module.exports.fetchAPI = () => {
//   console.log(endpoints, "<<endpoints");
//   return endpoints; // no need to interact with db?
// };
