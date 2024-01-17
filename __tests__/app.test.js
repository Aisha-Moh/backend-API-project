const app = require("../app.js");
const db = require("../db/connection.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const request = require("supertest");
const endpointsFile = require("../endpoints.json");

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
  describe("GET /api", () => {
    test("200: status, responds with an object describing all availabe endpoints in the API", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({ endpointsFile });
        });
    });
  });
  describe("GET /api/articles/:article_id", () => {
    test("200: status, responds with a single article object by id with all appropriate properties", () => {
      return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
          const { article } = body;
          expect(article).toHaveProperty("article_id");
          expect(article.article_id).toBe(1);
          expect(article.title).toBe("Living in the shadow of a great man");
          expect(article.topic).toBe("mitch");
          expect(article.author).toBe("butter_bridge");
          expect(article.body).toBe("I find this existence challenging");
          expect(article.created_at).toBe("2020-07-09T20:11:00.000Z");
          expect(article.votes).toBe(100);
          expect(article.article_img_url).toBe(
            "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700"
          );
        });
    });
    test("404: responds with status when non existent path", () => {
      return request(app)
        .get("/api/articles/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("endpoint not found");
        });
    });
    test("400: status, when providing invalid id", () => {
      return request(app)
        .get("/api/articles/notAnId")
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe("invalid ID: 400 Bad request");
        });
    });
  });
  describe("GET /api/articles", () => {
    test("200: status, responds with an array of article objects with all appropriate properties", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(Array.isArray(articles)).toBe(true);
          expect(articles.length).toBeGreaterThan(0);

          articles.forEach((article) => {
            expect(article).toHaveProperty("author");
            expect(article).toHaveProperty("title");
            expect(article).toHaveProperty("article_id");
            expect(article).toHaveProperty("topic");
            expect(article).toHaveProperty("created_at");
            expect(article).toHaveProperty("votes");
            expect(article).toHaveProperty("article_img_url");
          });
        });
    });
    test("200: responds with correctly sorted and ordered results (date created at in desc order) and not including the 'body' property", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toBeSortedBy("created_at", { descending: true });
          expect(articles).not.toHaveProperty("body");
        });
    });
    test("404: responds with status when non existent path", () => {
      return request(app)
        .get("/api/artickles")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("endpoint not found");
        });
    });
    test("200: status,responds with an articles arry with 'comment_count' property and also includes articles without comments", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          console.log(body, "bodyy");
          const { articles } = body;
          expect(articles.length).toBe(13);
          expect(Array.isArray(articles)).toBe(true);
          articles.forEach((article) => {
            expect(article).toHaveProperty("comment_count");
          });
        });
    });
  });
});
