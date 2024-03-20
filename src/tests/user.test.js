const supertest = require("supertest");
const app = require("../index");
const Users = require("../models/Users");

const request = supertest(app);

jest.mock("../models/Users");

describe("User API Tests", () => {
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3VuVXNlciI6eyJfaWQiOiI2NWViMzFjYzJiN2Y4ZDY1N2I4NDY0ZDciLCJuYW1lIjoicG9saXRlIiwiZW1haWwiOiJwb2xpdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaDRGekl4bU5ELmJJaUN1RkJmVUtHLm9IMUR4RzRPOE5LZEREWWx1MmxxWkxLV1MyOEJXZXEiLCJfX3YiOjB9LCJpYXQiOjE3MTA5MTkwMTYsImV4cCI6MTcxMTAwNTQxNn0.KMK2h92pPhjWMCvsFldhKWxwZ7sz5-8qMdIdgTX6PQA";

  beforeAll(() => {
    Users.create.mockResolvedValue({});
    Users.findOne.mockResolvedValue({});
    Users.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should register a new user", async () => {
    const response = await request.post("/users/register").send({
      name: "polite",
      email: "polite@gmail.com",
      password: "1234",
    });

    expect(response.status).toBe(200);
    expect(response.body.Message).toBe("User created");
  });

  it("should not register an already registered user", async () => {
    Users.findOne.mockResolvedValueOnce({});

    const response = await request.post("/users/register").send({
      name: "hategekimana",
      email: "hat@gmail.com",
      password: "123456",
    });

    expect(response.status).toBe(403);
    expect(response.body.Message).toBe("Already registered :)");
  });

  it("should get all users", async () => {
    const response = await request
      .get("/users/all")
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.users).toStrictEqual([]);
  });

  it("should login user with correct credentials", async () => {
    Users.findOne.mockResolvedValueOnce({
      email: "test@example.com",
      password: "$2b$10$12345678901234567890",
    });

    const response = await request.post("/users/login").send({
      email: "hat@gmail.com",
      password: "test",
    });

    expect(response.status).toBe(200);
    expect(response.body.Message).toBe("Login Successfull!");
    expect(response.body).toHaveProperty("token");
  });

  it("should not login user with incorrect credentials", async () => {
    Users.findOne.mockResolvedValueOnce({
      email: "test@example.com",
      password: "$2b$10$12345678901234567890",
    });

    const response = await request.post("/users/login").send({
      email: "test@example.com",
      password: "wrongpassword",
    });

    expect(response.status).toBe(404);
    expect(response.body.Message).toBe("Password Not match");
  });
});
