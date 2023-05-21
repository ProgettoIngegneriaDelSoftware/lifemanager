const express = require("express");
const app = express();
require("dotenv").config;
const cors = require("cors");
const path = require('path');

const authentication = require("./authentication/authentication.js");
const tokenChecker = require("./authentication/tokenChecker.js");

const users = require("./users.js");
const movimenti = require("./movimenti.js");
const liste = require("./liste.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", express.static("static")); // expose also this folder

app.use(express.static(path.join(__dirname, 'frontend/build')));

app.use((req, res, next) => {
  console.log(req.method + " " + req.url);
  next();
});

app.use("/api/v1/authentications", authentication);

// Gruppo di route per le richieste che richiedono il controllo del token
app.use("/api/v1/users", (req, res, next) => {
  // Controlla se la richiesta è una POST
  if (req.method === "POST") {
    // Passa alla prossima route senza applicare il controllo del token
    next();
  } else {
    // Applica il middleware tokenChecker
    tokenChecker(req, res, next);
  }
});
app.use("/api/v1/movimenti", tokenChecker);
app.use("/api/v1/liste", tokenChecker);
// app.use('/api/v1/students/me', tokenChecker);

/**
 * Resource routing
 */

app.use("/api/v1/users", users);
app.use("/api/v1/movimenti", movimenti);
app.use("/api/v1/liste", liste);

// app.use('/api/v1/booklendings', booklendings);

/* Default 404 handler */
app.use((req, res) => {
  res.status(404);
  res.json({ error: "Not found" });
});

module.exports = app;
