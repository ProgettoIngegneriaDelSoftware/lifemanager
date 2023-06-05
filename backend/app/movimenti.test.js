const request = require("supertest");
const app = require("./app");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

describe("GET /api/v1/movimenti", () => {
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
describe("POST /api/v1/movimenti", () => {
  beforeAll(async () => {
    jest.setTimeout(8000);
    app.locals.db = await mongoose.connect(process.env.MONGODB_URL);
  });
  afterAll(() => {
    mongoose.connection.close(true);
  });

  var token = jwt.sign({ email: "John@mail.com" }, process.env.SUPER_SECRET, {
    expiresIn: 86400,
  }); // create a valid token

  const requestBody1 = {
    titolo: "test",
    importo: "15",
    tipologia: "entrata",
    categoria: "voli",
    note: "test",
  };
  test("POST /api/v1/movimenti Inserimento di un nuovo movimento da parte di un utente autenticato, con tutti i campi compilati correttamente", () => {
    return request(app)
      .post("/api/v1/movimenti")
      .set("x-access-token", token)
      .set("Accept", "application/json")
      .send(requestBody1)
      .expect(201);
  }, 10000);
});
