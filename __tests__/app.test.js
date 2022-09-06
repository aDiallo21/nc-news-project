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
    it("should respond with an error 404-not found when there's a typo in the endpoint", () => {
      return request(app)
        .get("/api/toopics")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
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
    it("should respond with 404: Not found when article_id does not exist", () => {
      return request(app)
        .get("/api/articles/1000")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe(`Article id 1000 does not exist`);
        });
    });
    it("should respond with 400: Invalid Id when article_id is an invalid data type ", () => {
      return request(app)
        .get("/api/articles/apple")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Bad request");
        });
    });
  });
  describe.only("GET, /api/users", () => {
    it("should respond with an array of user objects ", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then((res) => {
          const users = res.body.users;
          expect(users).toHaveLength(4);
          users.forEach((user) => {
            expect(user).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });
    it("should respond with 404 - Not found when path is incorrect", () => {
      request(app)
        .get("/api/isers")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
});
