const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("GET /api/v1/authentications", () => {
  beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URL);
  });
  afterAll(() => {
    mongoose.connection.close(true);
  });
  /*
  var token = jwt.sign({ email: "John@mail.com" }, process.env.SUPER_SECRET, {
    expiresIn: 86400,
  }); // create a valid token
*/
  const requestBody = {
    username: "mm",
    password: "wrongPassword",
  };
  test("POST /api/v1/authentications with wrong password", () => {
    return (
      request(app)
        .post("/api/v1/authentications")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody)
        .expect({
          success: false,
          message: "Authentication failed. Wrong password.",
        })
    );
  });
});
