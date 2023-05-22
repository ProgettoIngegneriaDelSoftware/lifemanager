const express = require("express");
const router = express.Router();
const user = require("./models/user"); // get our mongoose model
const bcrypt = require("bcrypt");
const tokenChecker = require("./authentication/tokenChecker.js");

router.post("", async (req, res) => {
  if (
    !req.body.nome ||
    !req.body.congome ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(400).json({ error: "The fields must be not empty." });
  }

  const { username, email } = req.body;

  // Controlla se l'username è già utilizzato
  const existingUsername = await user.findOne({ username });
  if (existingUsername) {
    res.status(400).json({ error: "Username already exists" });
    return;
  }

  // Controlla se l'email è già utilizzata
  const existingEmail = await user.findOne({ email });
  if (existingEmail) {
    res.status(400).json({ error: "Email already exists" });
    return;
  }

  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    if (err) {
      console.error(err);
      return;
    }
    let utente = new user({
      nome: req.body.nome,
      cognome: req.body.cognome,
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });

    if (
      !utente.email ||
      typeof utente.email != "string" ||
      !checkIfEmailInString(utente.email)
    ) {
      res.status(400).json({
        error: 'The field "email" must be a non-empty string, in email format',
      });
      return;
    }

    utente = await utente.save();
    let userId = utente.id;
    res
      .location("/api/v1/users/" + userId)
      .status(201)
      .send();
  });
});

//router.use("/api/v1/users", tokenChecker);

router.get("/me", async (req, res) => {
  if (!req.loggedUser) {
    return;
  }

  let utente = await user.findOne({ email: req.loggedUser.email });
  if (!utente) {
    res.status(404).json({ error: " utente not found" });
    console.log(" utente not found");
    return;
  }
  res.status(200).json({
    self: "/api/v1/users/" + utente.id,
    email: utente.email,
  });
});

router.get("", async (req, res) => {
  let users;

  if (req.query.email) {
    // https://mongoosejs.com/docs/api.html#model_Model.find
    users = await user.find({ email: req.query.email }).exec();
  } else users = await user.find().exec();

  if (!users) {
    res.status(404).json({ error: " utente not found" });
    console.log(" utente not found");
    return;
  }
  users = users.map((entry) => {
    return {
      self: "/api/v1/users/" + entry.id,
      email: entry.email,
    };
  });

  res.status(200).json(users);
});

router.get("/:id", async (req, res) => {
  if (req.loggedUser.id !== req.params.id) {
    res.status(401).json({ error: "Non hai accesso a questo utente." });
    return;
  }

  let utente = await user.findById(req.params.id);
  if (!utente) {
    res.status(404).json({ error: " utente not found" });
    console.log(" utente not found");
    return;
  }
  res.status(200).json({
    email: utente.email,
    self: "/api/v1/users/" + utente.id,
    username: utente.username,
  });
});

router.put("/:id", async (req, res) => {
  let utente = await user.findOne({
    _id: req.params.id,
    _id: req.loggedUser.id,
  });

  if (!utente) {
    res.status(404).json({ error: " utente not found" });
    console.log("user not found");
    return;
  }

  utente.nome = req.body.nome || utente.nome;
  utente.cognome = req.body.cognome || utente.cognome;
  utente.email = req.body.cognome || utente.email;
  utente.username = req.body.cognome || utente.username;

  await utente.save();

  res
    .location("/api/v1/users/" + utente.id)
    .status(201)
    .send();
});

function checkIfEmailInString(text) {
  var re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
  return re.test(text);
}

module.exports = router;
