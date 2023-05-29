const express = require("express");
const router = express.Router();
const user = require("./models/user"); // get our mongoose model
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
const config = require('./../config')
const lista = require("./models/lista"); // get our mongoose model


// Configurazione del transporter di nodemailer per l'invio delle email
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: config.email,
    pass: config.password,
  }
});

async function send(email, nome, token) {
  const confirmationLink = config.frontendUrl + `/conferma-email?data=${token}`;
  const result = await transporter.sendMail({
    from: 'LifeManagerStaff',
    to: email,
    subject: 'Benvenuto in LifeManager',
    html: `
      <p>Ciao ${nome},</p>
      <p>Ti diamo il benvenuto in LifeManager. Per confermare il tuo indirizzo email, fai clic sul seguente link:</p>
      <a href="${confirmationLink}">Conferma Email</a>`
  });

  console.log(JSON.stringify(result, null, 4));
}

// richiesta per confermare email
router.post("/email", async (req, res) => {
  const { token } = req.body;
  var email, id;

  // if there is no token
  if (!token) {
    return res.status(401).send({
      success: false,
      message: 'No token provided.'
    });
  }

  // decode token, verifies secret and checks exp
  jwt.verify(token, process.env.SUPER_SECRET, function (err, decoded) {
    if (err) {
      return res.status(403).send({
        success: false,
        message: 'Failed to confirm email.'
      });
    } else {
      email = decoded.email;
      id = decoded._id;
      res.status(200).json({ message: "Email address confirmed" });
    }
  });

  try {
    let utente = await user.findOne({ email: email });

    if (utente) {
      utente.verifiedEmail = true;
      await utente.save();
      console.log("User verified:", utente);
    } else {
      console.log("User not found:", email);
    }

    let list = new lista({
      user: utente._id,
      nome: "Lista della Spesa",
    });
    list = await list.save();

    list = new lista({
      user: utente._id,
      nome: "To-Do-List",
    });
    list = await list.save();
  } catch (error) {
    console.error("Error updating user:", error);
  }

});


//Gestione richiesta POST a users
router.post("", async (req, res) => {
  if (
    !req.body.nome ||
    !req.body.cognome ||
    !req.body.username ||
    !req.body.email ||
    !req.body.password ||
    !req.body.confermaPassword
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

  // Controlla se le password corrispondono
  if (req.body.password !== req.body.confermaPassword) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  // Verifica la validità della password utilizzando una regex
  if (!checkPassword(req.body.password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }
  var token
  // Cripta la password, salva l'utente nel db e invia la mail
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
        error: 'The field "email" must be in email format',
      });
      return;
    }

    utente = await utente.save();
    // if user is found and password is right create a token
    var payload = {
      email: email,
      username: username
      // other data encrypted in the token	
    }
    var options = {
      expiresIn: 86400 // expires in 24 hours
    }
    token = jwt.sign(payload, process.env.SUPER_SECRET, options);
    send(req.body.email, req.body.nome, token)

    res.status(201).json("Registration success");
  });

});

router.get("/me", async (req, res) => {
  if (!req.loggedUser) {
    return;
  }

  let utente = await user.findOne({ email: req.loggedUser.email });
  if (!utente) {
    res.status(404).json({ error: "User not found" });
    console.log("User not found");
    return;
  }
  res.status(200).json({
    self: "/api/v1/users/" + utente.id,
    email: utente.email,
    nome: utente.nome
  });
});

router.get("", async (req, res) => {
  let users;

  if (req.query.email) {
    // https://mongoosejs.com/docs/api.html#model_Model.find
    users = await user.find({ email: req.query.email }).exec();
  } else users = await user.find().exec();

  if (!users) {
    res.status(404).json({ error: "User not found" });
    console.log("User not found");
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
    res.status(401).json({ error: "You do not have access to this user." });
    return;
  }

  let utente = await user.findById(req.params.id);
  if (!utente) {
    res.status(404).json({ error: "User not found" });
    console.log("User not found");
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
    res.status(404).json({ error: "User not found" });
    console.log("User not found");
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

function checkPassword(text) {
  var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&._])[A-Za-z\d@$!%*?&._]{8,}$/;
  return re.test(text);
}


module.exports = router;
