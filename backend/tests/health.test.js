const request = require("supertest");
const app = require("../app");

describe("Health Check API", () => {
    it("should return status ok", async () => {
        const res = await request(app).get("/api/v1/health");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ status: "ok" });
    });
});
