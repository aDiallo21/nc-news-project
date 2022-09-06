const app = require("../app");
const db = require("../db/connection");
const request = require("supertest");
const testData = require("../db/data/test-data");
const seed = require("../db/seeds/seed");

beforeEach(() => {
  return seed(testData);
});
afterAll(() => {
  return db.end();
});

describe("Nc News, testing API's", () => {
  describe("GET, /api/topics", () => {
    it("should respond with an array of topic objects ", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then((res) => {
          const topics = res.body.topics;
          expect(topics).toHaveLength(3);
          topics.forEach((topic) => {
            expect(topic).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    it("should respond with the article that matches the article_id passed in", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then((res) => {
          const article = res.body.article;
          expect(article).toEqual(
            expect.objectContaining({
              article_id: 1,
              title: "Living in the shadow of a great man",
              author: expect.any(String),
              body: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              topic: expect.any(String),
            })
          );
        });
    });
  });
});
