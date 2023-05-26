const express = require("express");
const router = express.Router();
const Carta = require("./models/carta"); // get our mongoose model
const mongoose = require("mongoose");

router.get("", async (req, res) => {
  let carta = await Carta.find({ user: req.loggedUser.id });
  if (!carta) {
    console.log("Card not found");
    res.status(404).json({ error: "Card not found" });
    return;
  }
  carta = carta.map((card) => {
    return {
      self: "/api/v1/carte" + card.nome,
      nome: card.nome,
    };
  });
  res.status(200).json(carta);
});

router.get("/:nome", async (req, res) => {
  // https://mongoosejs.com/docs/api.html#model_Model.findById
  let carta = await Carta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!carta) {
    console.log("Card not found");
    res.status(404).json({ error: "Card not found" });
    return;
  }
  res.status(200).json({
    self: "/api/v1/carte/" + carta.nome,
    nome: carta.nome,
    numerocarta: carta.numerocarta,
  });
});

router.post("", async (req, res) => {
  if (!req.body.nome || !req.body.numerocarta) {
    return res.status(400).json({ error: "Fields must be non-empty" });
  }

  const existingCard = await Carta.findOne({
    nome: req.body.nome,
    user: req.loggedUser.id,
  });
  if (existingCard) {
    res.status(400).json({ error: "Card already exists" });
    return;
  }

  let carta = new Carta({
    user: req.loggedUser.id,
    nome: req.body.nome,
    numerocarta: req.body.numerocarta,
  });

  carta = await carta.save();
  let cardId = carta.id;
  res
    .location("/api/v1/ricette/" + cardId)
    .status(201)
    .send();
});

router.delete("/:nome", async (req, res) => {
  let carta = await Carta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!carta) {
    return res.status(404).json({ error: "Card not found" });
  }
  await carta.deleteOne();
  res.status(204).json("Card deleted");
});

router.put("/:nome", async (req, res) => {
  let carta = await Carta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });

  if (!carta) {
    return res.status(404).json({ error: "Card not found" });
  }

  carta.nome = req.body.nome || carta.nome;
  carta.numerocarta = req.body.numerocarta || carta.numerocarta;

  carta = await carta.save();

  res
    .location("/api/v1/carte/" + carta.nome)
    .status(201)
    .send();
});

module.exports = router;
