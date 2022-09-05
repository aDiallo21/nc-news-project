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

describe("Nc news API tests", () => {
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
});
