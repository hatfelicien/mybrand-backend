const request = require("supertest");

const app = require("../index.js");

//import model
const blog = require("../models/Blogs");

//mock the bookmark model to prevent actual interraction with DB

jest.mock("blog");

//testing statements
describe("POST / blog", () => {
  Test("response will of 400 stutas if title missing", async () => {
    //send post request
    const response = await request(app).post("/blog").send({
      url: "https//andela.com",
    });
    expect(response.statusCode).toBe(400);
  });
});
