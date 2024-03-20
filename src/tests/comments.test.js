const supertest = require("supertest");
const app = require("../index");
const Comments = require("../models/comment");

const request = supertest(app);

jest.mock("../models/comment");

describe("Comments API Tests", () => {
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3VuVXNlciI6eyJfaWQiOiI2NWViMzFjYzJiN2Y4ZDY1N2I4NDY0ZDciLCJuYW1lIjoicG9saXRlIiwiZW1haWwiOiJwb2xpdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaDRGekl4bU5ELmJJaUN1RkJmVUtHLm9IMUR4RzRPOE5LZEREWWx1MmxxWkxLV1MyOEJXZXEiLCJfX3YiOjB9LCJpYXQiOjE3MTA5MTkwMTYsImV4cCI6MTcxMTAwNTQxNn0.KMK2h92pPhjWMCvsFldhKWxwZ7sz5-8qMdIdgTX6PQA";

  beforeAll(() => {
    Comments.create.mockResolvedValue({});
    Comments.findByIdAndDelete.mockResolvedValue({});
    Comments.findByIdAndUpdate.mockResolvedValue({});
    Comments.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should add a new comment", async () => {
    const response = await request.post("/comments/new").send({
      email: "test@example.com",
      comment: "This is a test comment",
    });

    expect(response.status).toBe(201);
    expect(response.body.Message).toBe("Comment added successfully");
  });

  it("should get all comments", async () => {
    const response = await request
      .get("/comments/all")
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.message).toStrictEqual([]);
  });

  it("should delete a comment", async () => {
    const commentId = "1234567890";

    const response = await request
      .delete(`/comments/delete/${commentId}`)
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.Message).toBe("comment deleted");
  });

  it("should update a comment", async () => {
    const commentId = "1234567890";

    const response = await request
      .put(`/comments/update/${commentId}`)
      .set("Authorization", authToken)
      .send({
        email: "test@example.com",
        comment: "Updated comment",
      });

    expect(response.status).toBe(200);
    expect(response.body.Message).toBe("Comment updated");
  });
});
