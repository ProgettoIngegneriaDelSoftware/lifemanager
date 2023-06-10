const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("test ricette", () => {
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

  test("GET /api/v1/ricette Visualizzazione delle ricette di un utente autenticato", () => {
    return request(app)
      .get("/api/v1/ricette")
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("GET /api/v1/ricette Visualizzazione delle ricette di un utente non autenticato", () => {
    return request(app)
      .get("/api/v1/ricette")
      .expect("Content-Type", /json/)
      .expect(401, { success: false, message: "No token provided." });
  });

  const requestBody1 = {
    nome: "pastatest",
    procedimento: "far bollire l'acqua",
    ingredienti: [
      { nome: "pasta", quantita: "100gr" },
      { nome: "sale", quantita: "qb" },
    ],
  };

  test("POST /api/v1/ricette Inserimento di una nuova ricetta da parte di un utente autenticato, con i campo nome, procedimento e ingredienti compilati correttamente", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/ricette")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody1)
      .expect(201);
  });

  const requestBody2 = {
    nome: "",
    procedimento: "",
    ingredienti: [
      { nome: "", quantita: "" },
      { nome: "", quantita: "" },
    ],
  };

  test("POST /api/v1/ricette Inserimento di una nuova ricetta da parte di un utente autenticato con il campo nome, procedimento o ingredienti non compilato", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/ricette")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody2)
      .expect(400, { error: "Fields must be non-empty" });
  });

  const requestBody3 = {
    nome: "test",
    procedimento: "test",
    ingredienti: ["100gr", "pasta", "sale"],
  };

  test("POST /api/v1/ricette Inserimento di una nuova ricetta da parte di un utente autenticato con i campi nome, procedimento e ingredienti compilati, ma quest'ultimo non è compilato correttamente", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/ricette")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody3)
      .expect(400);
  });

  const requestBody4 = {
    nome: "pastatest",
    procedimento: "far bollire l'acqua",
    ingredienti: [
      { nome: "pasta", quantita: "100gr" },
      { nome: "sale", quantita: "qb" },
    ],
  };

  test("POST /api/v1/ricette Inserimento di una nuova ricetta da parte di un utente autenticato con i campi nome, procedimento e ingredienti compilati correttamente, ma è già presente nel database una ricetta con lo stesso nome", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/ricette")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody4)
      .expect(400, { error: "Recipe already exists" });
  });

  const requestBody5 = {
    nome: "pastatest",
    procedimento: "far bollire l'acqua e cuocere la pasta",
    ingredienti: [
      { nome: "pasta", quantita: "300gr" },
      { nome: "sale", quantita: "qb" },
    ],
  };

  test("PUT /api/v1/ricette/pastatest Modifica di una nuova ricetta da parte di un utente autenticato ", () => {
    // Esecuzione del test
    return request(app)
      .put("/api/v1/ricette/pastatest")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody5)
      .expect(201);
  });

  const requestBody6 = {
    nome: "test",
    procedimento: "prova put ricetta",
    ingredienti: [
      { nome: "pasta", quantita: "300gr" },
      { nome: "sale", quantita: "qb" },
    ],
  };

  test("PUT /api/v1/ricette/pastatest Modifica di una ricetta da parte di un utente autenticato, senza che la ricetta venga prima inserita nel database ", () => {
    // Esecuzione del test
    return request(app)
      .put("/api/v1/ricette/test")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody6)
      .expect(404, { error: "Recipe not found" });
  });

  test("DELETE /api/v1/ricette/:nome Cancellazione di una ricetta da parte di un utente autenticato, senza che la ricetta venga prima inserita nel database", () => {
    // Esecuzione del test
    return request(app)
      .delete("/api/v1/ricette/ricettanonesistente")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .expect(404, { error: "Recipe not found" });
  });

  test("DELETE /api/v1/ricette/:nome Cancellazione di una ricetta da parte di un utente autenticato", () => {
    // Esecuzione del test
    return request(app)
      .delete("/api/v1/ricette/pastatest")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .expect(204);
  });
});
