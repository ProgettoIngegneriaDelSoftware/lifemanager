const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("test cartefedelta", () => {
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

  test("GET /api/v1/carte Visualizzazione delle carte di un utente autenticato", () => {
    return request(app)
      .get("/api/v1/carte")
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("GET /api/v1/carte Visualizzazione delle carte di un utente non autenticato", () => {
    return (
      request(app)
        .get("/api/v1/carte")
        //.set("x-access-token", token)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  const requestBody1 = {
    nome: "test",
    numerocarta: "123",
  };

  test("POST /api/v1/carte Inserimento di una nuova carta fedeltà da parte di un utente autenticato, con il campo nome compilato ", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/carte")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody1)
      .expect(201);
  });

  const requestBody2 = {
    numerocarta: "123",
  };
  test("POST /api/v1/movimenti Inserimento di una nuova carta fedeltà da parte di un utente autenticato, con il campo nome non compilato ", () => {
    return request(app)
      .post("/api/v1/movimenti")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody2)
      .expect(400, { error: "The fields must be non-empty" });
  });

  const requestBody3 = {
    nome: "test",
    numerocarta: "456",
  };

  test("POST /api/v1/carte Inserimento di una nuova carta fedeltà da parte di un utente autenticato con il campi nome compilato, ma è già presente nel database una carta fedeltà con lo stesso nome ", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/carte")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody3)
      .expect(400, { error: "Card already exists" });
  });

  const requestBody4 = {
    nome: "test",
    numerocarta: "789",
  };

  test("PUT /api/v1/carte/:nome Modifica di una carta fedeltà da parte di un utente autenticato", () => {
    return request(app)
      .put("/api/v1/carte/test")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody4)
      .expect(201);
  });

  const requestBody5 = {
    nome: "test1",
    numerocarta: "123",
  };

  test("PUT /api/v1/carte/:nome Modifica di una carta fedeltà da parte di un utente autenticato, senza che la carta venga prima inserita nel database", () => {
    return request(app)
      .put("/api/v1/carte/test1")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody5)
      .expect(404, { error: "Card not found" });
  });

  test("DELETE /api/v1/carte/:nome Cancellazione di una carta fedeltà  da parte di un utente autenticato, senza che la carta venga prima inserita nel database", () => {
    return request(app)
      .delete("/api/v1/carte/test1")
      .set("x-access-token", token)
      .expect(404, { error: "Card not found" });
  });

  test("DELETE /api/v1/carte/:nome Cancellazione di una carta fedeltà  da parte di un utente autenticato", () => {
    return request(app)
      .delete("/api/v1/carte/test")
      .set("x-access-token", token)
      .expect(204);
  });
});
