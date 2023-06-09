const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("test movimenti", () => {
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

  test("GET /api/v1/movimenti Visualizzazione dei movimenti di un utente autenticato", () => {
    return request(app)
      .get("/api/v1/movimenti")
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .expect(200);
  });

  test("GET /api/v1/movimenti Visualizzazione dei movimenti di un utente non autenticato", () => {
    return (
      request(app)
        .get("/api/v1/movimenti")
        //.set("x-access-token", token)
        .expect("Content-Type", /json/)
        .expect(401)
    );
  });

  const requestBody1 = {
    titolo: "test",
    importo: "15",
    tipologia: "entrata",
    categoria: "voli",
    note: "test",
  };

  test("POST /api/v1/movimenti Inserimento di un nuovo movimento da parte di un utente autenticato, con tutti i campi compilati correttamente", () => {
    // Esecuzione del test
    return request(app)
      .post("/api/v1/movimenti")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody1)
      .expect(201);
  });

  const requestBody2 = {
    titolo: "",
    importo: "15",
    tipologia: "entrata",
    categoria: "voli",
    note: "test",
  };
  test("POST /api/v1/movimenti Inserimento di un nuovo movimento da parte di un utente autenticato, con il campo titolo vuoto", () => {
    return request(app)
      .post("/api/v1/movimenti")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody2)
      .expect(400, { error: "The fields must be non-empty" });
  });

  const requestBody3 = {
    titolo: "test",
    importo: "stringa test",
    tipologia: "entrata",
    categoria: "voli",
    note: "test",
  };
  test("POST /api/v1/movimenti Inserimento di un nuovo movimento da parte di un utente autenticato, con tutti i campi compilati , ma nell'importo viene inserita una stringa", () => {
    return request(app)
      .post("/api/v1/movimenti")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody3)
      .expect(400, { error: "The field importo must be a number" });
  });

  const requestBody4 = {
    titolo: "test",
    importo: "85",
    tipologia: "entrata",
    categoria: "voli",
    note: "test",
  };
  test("PUT /api/v1/movimenti/:id Modifica di un movimento da aprte di un utente autenticato", () => {
    return request(app)
      .put("/api/v1/movimenti/647f0209d17846b306117a9c")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody4)
      .expect(201);
  });

  const requestBody5 = {
    titolo: "testput id sbagliato",
    importo: "85",
    tipologia: "entrata",
    categoria: "voli",
    note: "test",
  };
  test("PUT /api/v1/movimenti/:id Modifica di un movimento da parte di un utente autenticato, senza che il movimento venga prima inserito nel database", () => {
    return request(app)
      .put("/api/v1/movimenti/abcd")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody5)
      .expect(400, { error: "Invalid ID" });
  });

  test("DELETE /api/v1/movimenti/:id Cancellazione di un movimento da parte di un utente autenticato", () => {
    return request(app)
      .delete("/api/v1/movimenti/6482f9a77199f9042d2efcea")
      .set("x-access-token", token)
      .expect(204);
  });

  test("DELETE /api/v1/movimenti/:id Cancellazione di un movimento da parte di un utente autenticato, senza che il movimento venga prima inserito nel database", () => {
    return request(app)
      .delete("/api/v1/movimenti/abcd")
      .set("x-access-token", token)
      .expect("Content-Type", /json/)
      .expect(400, { error: "Invalid ID" });
  });
});

/*
describe("GET /api/v1/movimenti", () => {
  let movSpy; // Moking Book.find method
  beforeAll(() => {
    const Movimento = require("./models/movimento");
    movSpy = jest.spyOn(Movimento, "find").mockImplementation((criterias) => {
      return [{ id: 1010, titolo: "Jest" }];
    });
  });
  afterAll(async () => {
    movSpy.mockRestore();
    //movSpyFindById.mockRestore();
  });
  test("GET /api/v1/movimenti should respond with an array of mov", async () => {
    request(app)
      .get("/api/v1/movimenti")
      .expect("Content-Type", /json/)
      .then((res) => {
        if (res.body && res.body[0])
          expect(res.body[0]).toEqual({
            self: "/api/v1/movimenti/1010",
            titolo: "Jest",
          });
      });
  });
});
*/
