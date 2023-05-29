const express = require("express");
const router = express.Router();
const Movimento = require("./models/movimento"); // get our mongoose model
const CategoriaMovimento = require("./models/categoria_movimento"); // get our mongoose model
const mongoose = require("mongoose");

router.get("", async (req, res) => {
  let mov = await Movimento.find({ user: req.loggedUser.id });
  if (!mov || mov.length === 0) {
    res.status(404).json({ error: "movimenti not found" });
    return;
  }
  mov = mov.map((movi) => {
    return {
      self: "/api/v1/movimenti/" + movi.id,
      titolo: movi.titolo,
    };
  });
  res.status(200).json(mov);
});

router.get("/tipologia/:tipologia", async (req, res) => {
  if (req.params.tipologia !== "entrata" && req.params.tipologia !== "uscita") {
    return res.status(400).json({ error: "Invalid value for 'tipologia'" });
  }
  let mov = await Movimento.find({
    tipologia: req.params.tipologia,
    user: req.loggedUser.id,
  });
  if (!mov || mov.length == 0) {
    res.status(404).json({ error: "movimenti not found" });
    return;
  }
  mov = mov.map((movi) => {
    return {
      self: "/api/v1/movimenti/" + movi.id,
      titolo: movi.titolo,
    };
  });
  res.status(200).json(mov);
});

router.get("/categorie/:nome", async (req, res) => {
  // https://mongoosejs.com/docs/api.html#model_Model.findById
  let catID = await CategoriaMovimento.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!catID) {
    res.status(404).json({ error: "categoria not found" });

    return;
  }
  console.log(catID._id);
  let mov = await Movimento.find({
    categoria: catID._id,
    user: req.loggedUser.id,
  });
  if (!mov) {
    res.status(404).json({ error: "movimento not found" });
    return;
  }
  mov = mov.map((movi) => {
    return {
      self: "/api/v1/movimenti/" + movi.id,
      titolo: movi.titolo,
    };
  });
  res.status(200).json(mov);
});

router.post("", async (req, res) => {
  if (
    !req.body.categoria ||
    !req.body.titolo ||
    !req.body.importo ||
    !req.body.tipologia
  ) {
    return res.status(400).json({ error: "The fields must be non-empty" });
  }

  if (req.body.tipologia !== "entrata" && req.body.tipologia !== "uscita") {
    return res.status(400).json({ error: "Invalid value for 'tipologia'" });
  }

  let categoria = await CategoriaMovimento.findOneAndUpdate(
    //se nell'inserire un movimento l'utente specifica una categoria non presente nel db, viene aggiunta anche tale categoria
    { nome: req.body.categoria, user: req.loggedUser.id },
    { nome: req.body.categoria, user: req.loggedUser.id },
    { upsert: true, new: true }
  );

  let mov = new Movimento({
    user: req.loggedUser.id,
    titolo: req.body.titolo,
    importo: req.body.importo,
    tipologia: req.body.tipologia,
    categoria: categoria._id,
    note: req.body.note,
  });

  mov = await mov.save();

  let movId = mov.id;

  res
    .location("/api/v1/movimenti/" + movId)
    .status(201)
    .send();
});

router.delete("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  let mov = await Movimento.findOne({
    _id: req.params.id,
    user: req.loggedUser.id,
  });
  if (!mov) {
    return res.status(404).json({ error: "movimento not found" });
  }
  await mov.deleteOne();
  res.status(204).json("movimento removed");
});

router.put("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  try {
    let categoria = await CategoriaMovimento.findOneAndUpdate(
      //se nel modificare un movimento l'utente specifica una categoria non presente nel db, viene aggiunta anche tale categoria
      { nome: req.body.categoria, user: req.loggedUser.id },
      { nome: req.body.categoria, user: req.loggedUser.id },
      { upsert: true, new: true }
    );

    let mov = await Movimento.findOne({
      _id: req.params.id,
      user: req.loggedUser.id,
    });

    if (!mov) {
      return res.status(404).json({ error: "movimento not found" });
    }
    if (
      req.body.tipologia &&
      req.body.tipologia !== "entrata" &&
      req.body.tipologia !== "uscita"
    ) {
      return res.status(400).json({ error: "Invalid value for 'tipologia'" });
    }

    mov.titolo = req.body.titolo || mov.titolo;
    mov.importo = req.body.importo || mov.importo;
    mov.tipologia = req.body.tipologia || mov.tipologia;
    mov.categoria = categoria._id || mov.categoria;
    mov.note = req.body.note || mov.note;

    mov = await mov.save();

    res
      .location("/api/v1/movimenti/" + mov.id)
      .status(201)
      .send();
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/categorie", async (req, res) => {
  let cat = await CategoriaMovimento.find({ user: req.loggedUser.id });
  if (!cat || cat.length === 0) {
    res.status(404).json({ error: "categoria di movimento not found" });
    return;
  }
  cat = cat.map((categ) => {
    return {
      self: "/api/v1/movimenti/categorie/" + categ.id,
      nome: categ.nome,
    };
  });
  res.status(200).json(cat);
});

router.post("/categorie", async (req, res) => {
  if (!req.body.nome || req.body.nome === "") {
    return res.status(400).json({ error: "The fields must be non-empty" });
  }

  let cat = new CategoriaMovimento({
    user: req.loggedUser.id,
    nome: req.body.nome,
  });

  cat = await cat.save();

  let catId = cat.id;

  res
    .location("/api/v1/movimenti/categorie/" + catId)
    .status(201)
    .send();
});

router.delete("/categorie/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  let cat = await CategoriaMovimento.findOne({
    _id: req.params.id,
    user: req.loggedUser.id,
  }).exec();
  if (!cat) {
    res.status(404).json({ error: "categoria di movimento not found" });
    return;
  }
  await cat.deleteOne();
  console.log("categoria removed");
  res.status(204).send();
});

router.get("/:id", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ error: "Invalid ID" });
  }
  let mov = await Movimento.findOne({
    _id: req.params.id,
    user: req.loggedUser.id,
  });

  if (!mov) {
    res.status(404).json({ error: "movimento not found" });
    return;
  }
  res.status(200).json({
    self: "/api/v1/movimenti/" + mov.id,
    titolo: mov.titolo,
    importo: mov.importo,
    tipologia: mov.tipologia,
    categoria: mov.categoria,
    note: mov.note,
  });
});

module.exports = router;