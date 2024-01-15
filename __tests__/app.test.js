const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const request = require("supertest");

afterAll(() => {
  return db.end();
});

beforeEach(() => {
  return seed(data);
});

describe("app", () => {
  describe("GET /api/topics", () => {
    test("200: status, responds with array of topic objects including description and slug properties", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(topics.length).toBeGreaterThan(0);
          expect(Array.isArray(topics)).toBe(true);
          topics.forEach((topic) => {
            expect(typeof topic.description).toBe("string");
            expect(typeof topic.slug).toBe("string");
          });
        });
    });
    test("404: responds with status when non existent path", () => {
      return request(app)
        .get("/api/toooopics")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("endpoint not found");
        });
    });
  });
});
