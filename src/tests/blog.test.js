const supertest = require("supertest");
const app = require("../index");
const Blogs = require("../models/Blogs");

const request = supertest(app);

jest.mock("../models/Blogs");

describe("Blogs API Tests", () => {
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3VuVXNlciI6eyJfaWQiOiI2NWViMzFjYzJiN2Y4ZDY1N2I4NDY0ZDciLCJuYW1lIjoicG9saXRlIiwiZW1haWwiOiJwb2xpdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaDRGekl4bU5ELmJJaUN1RkJmVUtHLm9IMUR4RzRPOE5LZEREWWx1MmxxWkxLV1MyOEJXZXEiLCJfX3YiOjB9LCJpYXQiOjE3MTA5MTkwMTYsImV4cCI6MTcxMTAwNTQxNn0.KMK2h92pPhjWMCvsFldhKWxwZ7sz5-8qMdIdgTX6PQA";

  beforeAll(() => {
    // Mock
    Blogs.create.mockResolvedValue({});
    Blogs.findById.mockResolvedValue({});
    Blogs.findByIdAndUpdate.mockResolvedValue({});
    Blogs.findByIdAndDelete.mockResolvedValue({});
    Blogs.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should create a new blog", async () => {
    const response = await request
      .post("/blogs/new")
      .set("Authorization", authToken)
      .send({
        title: "Test Blog",
        desc: "This is a test blog",
      });

    expect(response.status).toBe(201);
    expect(response.body.Message).toBe("Blog is created");
  });

  it("should get all blogs", async () => {
    const response = await request
      .get("/blogs/all")
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.Message).toStrictEqual([]);
  });

  it("should update a blog", async () => {
    const response = await request
      .put("/blogs/123")
      .set("Authorization", authToken)
      .send({
        title: "Updated Blog",
        desc: "This blog has been updated",
      });

    expect(response.status).toBe(200);
    expect(response.body.Message).toBe("Blog updated");
  });
});
