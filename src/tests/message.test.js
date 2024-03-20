const supertest = require("supertest");
const app = require("../index");
const Messages = require("../models/message");

const request = supertest(app);

jest.mock("../models/message");

describe("Message API Tests", () => {
  const authToken =
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb3VuVXNlciI6eyJfaWQiOiI2NWViMzFjYzJiN2Y4ZDY1N2I4NDY0ZDciLCJuYW1lIjoicG9saXRlIiwiZW1haWwiOiJwb2xpdGVAZ21haWwuY29tIiwicGFzc3dvcmQiOiIkMmIkMTAkaDRGekl4bU5ELmJJaUN1RkJmVUtHLm9IMUR4RzRPOE5LZEREWWx1MmxxWkxLV1MyOEJXZXEiLCJfX3YiOjB9LCJpYXQiOjE3MTA5MTkwMTYsImV4cCI6MTcxMTAwNTQxNn0.KMK2h92pPhjWMCvsFldhKWxwZ7sz5-8qMdIdgTX6PQA";

  beforeAll(() => {
    // Mock
    Messages.create.mockResolvedValue({});
    Messages.findByIdAndDelete.mockResolvedValue({});
    Messages.find.mockResolvedValue([]);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  it("should add a new message", async () => {
    const response = await request.post("/messages/new").send({
      username: "mwizerwa",
      email: "mwizerwa@gmail.com",
      content: "Hi feli",
    });

    expect(response.status).toBe(201);
    expect(response.body.Message).toBe("Message sent");
  });

  it("should get all messages", async () => {
    const response = await request
      .get("/messages/all")
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("OK");
    expect(response.body.message).toStrictEqual([]);
  });

  it("should delete a message", async () => {
    const messageId = "123456";

    const response = await request
      .delete(`/messages/delete/${messageId}`)
      .set("Authorization", authToken);

    expect(response.status).toBe(200);
    expect(response.body.Message).toBe("message deleted");
  });
});
