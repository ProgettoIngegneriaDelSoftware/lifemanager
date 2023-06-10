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

  test("POST /api/v1/liste Inserimento di una nuova lista da parte di un utente autenticato, con il campo nome vuoto", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/liste")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody2)
      .expect(400, { error: "Name of the list must be inserted." });
  });

  const requestBody3 = {
    items: ["elementotest"],
  };

  test("POST /api/v1/liste/listatest/elementi Inserimento di un nuovo elemento in una lista da parte di un utente autenticato, con i campi compilati correttamente", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/liste/listatest/elementi")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody3)
      .expect(201);
  });

  const requestBody4 = {
    items: "item1",
  };

  test("POST /api/v1/liste/listatest/elementi Inseririmento di un nuovo elemento in una lista da parte di un utente autenticato, con i campi non compilati correttamente", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/liste/listatest/elementi")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody4)
      .expect(400, { error: "The field items must be an array of string" });
  });

  const requestBody5 = {
    items: "item1",
  };

  test("PUT /api/v1/liste/listanonesistente Modifica di una lista da parte di un utente autenticato, senza che la lista venga prima inserita nel database", () => {
    // Esecuzione del test
    return request(app)
      .put("/api/v1/liste/listanonesistente")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody5)
      .expect(404, { error: "lista not found" });
  });

  test("DELETE /api/v1/liste/:nome Cancellazione di una lista da parte di un utente autenticato, senza che la lista venga prima inserita nel database", () => {
    // Esecuzione del test
    return request(app)
      .delete("/api/v1/liste/listanonesistente")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .expect(404, { error: "lista not found" });
  });

  test("DELETE /api/v1/liste/:nome Cancellazione di una lista da parte di un utente autenticato", () => {
    // Esecuzione del test
    return request(app)
      .delete("/api/v1/liste/listatest")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .expect(204);
  });
});
