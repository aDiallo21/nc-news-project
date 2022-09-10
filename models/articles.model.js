const db = require("../db/connection");

exports.findArticleById = (article_id) => {
  const sqlQuery =
    "SELECT articles.*, CAST(COUNT(comments.article_id) AS INT) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id  WHERE articles.article_id = $1 GROUP BY articles.article_id;";
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
exports.findAllArticles = ({ topic }) => {
  let sqlQuery =
    "SELECT articles.*, COUNT (comments.article_id) AS comment_count FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id ";
  console.log(topic);
  const sqlArr = [];
  if (topic !== undefined) {
    sqlQuery += "WHERE articles.topic = $1 ";
    sqlArr.push(topic);
  }

  sqlQuery += "GROUP BY articles.article_id ORDER BY created_at DESC;";

  return db.query(sqlQuery, sqlArr).then((result) => {
    // sort it into descending order
    // console.log(result.rows);
    return result.rows;
  });
};
