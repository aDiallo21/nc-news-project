const db = require("../db/connection");

exports.findArticleById = (article_id) => {
  const sqlQuery = "SELECT * FROM articles WHERE article_id = $1;";
  return db.query(sqlQuery, [article_id]).then((result) => {
    if (!result.rows.length) {
      return Promise.reject({
        status: 404,
        msg: `Article id ${article_id} does not exist`,
      });
    }
    return result.rows[0];
  });
};
exports.incVotesById = (incVotes, article_id) => {
  return db
    .query(
      "UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *;",
      [incVotes, article_id]
    )
    .then((result) => {
      if (!result.rows.length) {
        return Promise.reject({
          status: 404,
          msg: `Article id ${article_id} does not exist`,
        });
      }
      return result.rows[0];
    });
};
