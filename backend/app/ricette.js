const express = require("express");
const router = express.Router();
const ricetta = require("./models/ricetta"); // get our mongoose model
const mongoose = require("mongoose");

router.get("", async (req, res) => {
  let ric = await ricetta.find({ user: req.loggedUser.id });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }
  ric = ric.map((rici) => {
    return {
      self: "/api/v1/ricette/" + rici.nome,
      nome: rici.nome,
    };
  });
  res.status(200).json(ric);
});

router.get("/:nome", async (req, res) => {
  // https://mongoosejs.com/docs/api.html#model_Model.findById
  let ric = await ricetta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }
  res.status(200).json({
    self: "/api/v1/ricette/" + ric.nome,
    nome: ric.nome,
    ingredienti: ric.ingredienti.length
  });
});

router.post("", async (req, res) => {
  if (!req.body.nome || !req.body.ingredienti || !req.body.procedimento) {
    return res
      .status(400)
      .json({ error: "Fields must be non-empty" });
  }

  nomeRicetta=req.body.nome
  const existingRicetta = await ricetta.findOne({ nomeRicetta });
  if (existingRicetta) {
    res.status(400).json({ error: "Recipe already exists" });
    return;
  }

  let ric = new ricetta({
    user: req.loggedUser.id,
    nome: nomeRicetta,
    procedimento: req.body.procedimento
  });

  for (var i = 0; i < req.body.ingredienti.length; i++) {
    ric.ingredienti.push(req.body.ingredienti[i]);
  }

  ric = await ric.save();
  let ricId = ric.id;
  res
    .location("/api/v1/ricette/" + ricId)
    .status(201)
    .send();
});


module.exports = router;
