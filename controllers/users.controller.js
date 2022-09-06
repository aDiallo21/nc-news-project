const { collectUsers } = require("../models/users.model");

exports.getUsers = (req, res, next) => {
  collectUsers().then((users) => {
    res.status(200).send({ users });
  });
};
