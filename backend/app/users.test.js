const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("POST /api/v1/users", () => {
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
    nome: "test",
    cognome: "test",
    username: "test",
    email: "John@mail.com",
    password: "Test123.ciao",
    confermaPassword: "Test123.ciao",
  };
  test("POST /api/v1/users Registrazione di un nuovo utente con email e password validi", () => {
    return (
      request(app)
        .post("/api/v1/users")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody1)
        .expect(201)
    );
  });

  const requestBody2 = {
    nome: "test",
    cognome: "test",
    username: "test01",
    email: "Johmail.com",
    password: "Test123.ciao",
    confermaPassword: "Test123.ciao",
  };
  test("POST /api/v1/users Registrazione di un nuovo utente con indirizzo email non valido", () => {
    return (
      request(app)
        .post("/api/v1/users")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody2)
        .expect(400, { error: "The field email must be in email format" })
    );
  });

  const requestBody3 = {
    nome: "test",
    cognome: "test",
    username: "test01",
    email: "John@mail.com",
    password: "Test123.ciao",
    confermaPassword: "Test123.ciao",
  };
  test("POST /api/v1/users Registrazione di un nuovo utente con un indirizzo email già registrato", () => {
    return (
      request(app)
        .post("/api/v1/users")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody3)
        .expect(400, { error: "Email already exists" })
    );
  });

  const requestBody4 = {
    nome: "test",
    cognome: "test",
    username: "test",
    email: "John@mmmail.com",
    password: "Test123.ciao",
    confermaPassword: "Test123.ciao",
  };
  test("POST /api/v1/users Registrazione di un nuovo utente con un username già registrato", () => {
    return (
      request(app)
        .post("/api/v1/users")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody4)
        .expect(400, { error: "Username already exists" })
    );
  });

  const requestBody5 = {
    nome: "test",
    cognome: "test",
    username: "test01",
    email: "John@mmmail.com",
    password: "",
    confermaPassword: "Test123.ciao",
  };
  test("POST /api/v1/users Registrazione di un nuovo utente con il campo password vuoto", () => {
    return (
      request(app)
        .post("/api/v1/users")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody5)
        .expect(400, { error: "The fields must be not empty." })
    );
  });

  const requestBody6 = {
    nome: "test",
    cognome: "test",
    username: "test01",
    email: "",
    password: "Test123.ciao",
    confermaPassword: "Test123.ciao",
  };
  test("POST /api/v1/users Registrazione di un nuovo utente con il campo email vuoto", () => {
    return (
      request(app)
        .post("/api/v1/users")
        //.set("x-access-token", token)
        .set("Accept", "application/json")
        .send(requestBody5)
        .expect(400, { error: "The fields must be not empty." })
    );
  });
});
