const { findArticleById, incVotesById } = require("../models/articles.model");

exports.getArticleById = (req, res, next) => {
  const { article_id } = req.params;
  return findArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article: article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchVotes = (req, res, next) => {
  const { article_id } = req.params;
  const { incVotes } = req.body;
  return incVotesById(incVotes, article_id)
    .then((updatedArticle) => {
      res.status(201).send({ article: updatedArticle });
    })
    .catch((err) => {
      next(err);
    });
};
