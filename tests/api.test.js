const app = require("../api");
const request = require("supertest");

describe("GET /health", () => {
    test("Testing GET API", async() => {
        const response = await request(app).get("/health");
        expect(response.body).toEqual("server responds with 200 OK if it is healht.");
        expect(response.statusCode).toBe(200);
    });
});
