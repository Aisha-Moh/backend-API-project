const { fetchTopics } = require("../models/topics.model");

module.exports.getTopics = (req, res, next) => {
  console.log(req.query, "<< request query in controller");
  fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
      next(err);
    });
};
