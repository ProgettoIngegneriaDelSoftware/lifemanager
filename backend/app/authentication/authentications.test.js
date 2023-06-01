const request = require("supertest");
const app = require("../app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("POST /api/v1/authentications", () => {
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
  const requestBody1 = {
    username: "mm",
    password: "wrongPassword",
  };
  test("POST /api/v1/authentications Login di un utente registrato con username o email correti ma password sbagliata", () => {
    return (
      request(app)
        .post("/api/v1/authentications")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody1)
        .expect({
          success: false,
          message: "Authentication failed. Wrong password.",
        })
    );
  });

  const requestBody2 = {
    username: "mmmm",
    password: "wrongPassword",
  };
  test("POST /api/v1/authentications Login di un utente registrato con email o username non corretti", () => {
    return (
      request(app)
        .post("/api/v1/authentications")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody2)
        .expect({
          success: false,
          message: "Authentication failed. User not found.",
        })
    );
  });

  const requestBody3 = {
    username: "mm",
    password: "ProvaProva1.",
  };
  test("POST /api/v1/authentications Login di un utente registrato con email o username e password validi", () => {
    return (
      request(app)
        .post("/api/v1/authentications")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody3)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.message).toBe("Enjoy your token!");
          expect(res.body.token).toBeDefined();
          expect(res.body.email).toBeDefined();
          expect(res.body.id).toBeDefined();
          expect(res.body.self).toBeDefined();
        })
    );
  });
});
