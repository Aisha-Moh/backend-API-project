const { fetchTopics, fetchAPI } = require("../models/topics.model");
const endpointsFile = require("../endpoints.json");

module.exports.getTopics = (req, res, next) => {
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.getAPI = (req, res, next) => {
  console.log(req.query, "in controller");
  res.status(200).send(endpointsFile);
};
