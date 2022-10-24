const request = require("supertest");
const app = require("../app");

it("GET /", async () => {
  const res = await request(app).get("/");

  expect(res.statusCode).toBe(200);
});
