const { collectTopics } = require("../models/topics.model");

exports.getTopics = (req, res, next) => {
  collectTopics().then((topics) => {
    res.status(200).send({ topics });
  });
};
