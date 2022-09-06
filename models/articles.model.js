const db = require("../db/connection");

exports.findArticleById = (article_id) => {
  const sqlQuery = "SELECT * FROM articles WHERE article_id = $1;";
  return db.query(sqlQuery, [article_id]).then((result) => {
    return result.rows[0];
  });
};
