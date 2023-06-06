const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("test liste", () => {
  beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URL);
  });
  afterAll(() => {
    mongoose.connection.close(true);
  });

  var token = jwt.sign(
    { email: "mauromeneghello01@gmail.com" },
    process.env.SUPER_SECRET,
    {
      expiresIn: 86400,
    }
  ); // create a valid token

  test("GET /api/v1/liste Visualizzazione delle liste di un utente non autenticato", () => {
    return request(app)
      .get("/api/v1/liste")
      .expect("Content-Type", /json/)
      .expect(401);
  });

  const requestBody1 = {
    nome: "listatest",
  };

  test("POST /api/v1/liste Inserimento di una nuova lista da parte di un utente autenticato, con il campo nome compilato", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/liste")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody1)
      .expect(201);
  });

  const requestBody2 = {
    nome: "",
  };

  test("POST /api/v1/liste Inserimento di una nuova lista da parte di un utente autenticato, con il campo nome compilato", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/liste")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody2)
      .expect(400, { error: "Name of the list must be inserted." });
  });
});
