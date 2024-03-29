const {
  fetchArticleById,
  fetchArticles,
  updateVote,
} = require("../models/articles.model");

module.exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  fetchArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.getArticles = (req, res, next) => {
  const { sort_by, order, topic } = req.query;
  fetchArticles(sort_by, order, topic)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports.patchArticleByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const votes = req.body.inc_votes;
  updateVote(votes, article_id)
    .then((vote) => {
      res.status(201).send(vote);
    })
    .catch((err) => {
      next(err);
    });
};
