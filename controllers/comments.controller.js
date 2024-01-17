const { checkForArticles } = require("../db/seeds/utils");
const { fetchCommentsByArticleId } = require("../models/comments.model");

module.exports.getCommentsByArticleId = (req, res, next) => {
  const { article_id } = req.params;
  const { sort_by } = req.query;
  const { order } = req.query;

  const isReal = checkForArticles(article_id);
  const sortedComments = fetchCommentsByArticleId(article_id, sort_by, order);

  Promise.all([isReal, sortedComments])
    .then((comments) => {
      res.status(200).send({ comments: comments[1] });
    })

    .catch((err) => {
      next(err);
    });
};
