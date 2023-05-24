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
    ingredienti: ric.ingredienti,
    procedimento: ric.procedimento,
  });
});

router.get("/:nome/ingredienti", async (req, res) => {
  let ric = await ricetta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  const ingr = ric.ingredienti.map((ingrediente) => {
    return {
      nome: ingrediente.nome,
      quantita: ingrediente.quantita,
    };
  });

  res.status(200).json({
    self: "/api/v1/ricette/" + ric.nome + "/ingredienti",
    nome: ric.nome,
    ingredienti: ingr,
  });
});

router.post("", async (req, res) => {
  if (
    !req.body.nome ||
    !req.body.ingredienti ||
    !req.body.procedimento ||
    req.body.ingredienti.some(
      (ingrediente) => !ingrediente.nome || !ingrediente.quantita
    )
  ) {
    return res.status(400).json({ error: "Fields must be non-empty" });
  }

  const existingRicetta = await ricetta.findOne({
    nome: req.body.nome,
    user: req.loggedUser.id,
  });
  if (existingRicetta) {
    res.status(400).json({ error: "Recipe already exists" });
    return;
  }

  let ric = new ricetta({
    user: req.loggedUser.id,
    nome: req.body.nome,
    procedimento: req.body.procedimento,
  });

  for (let i = 0; i < req.body.ingredienti.length; i++) {
    const ingrediente = {
      nome: req.body.ingredienti[i].nome,
      quantita: req.body.ingredienti[i].quantita,
    };
    ric.ingredienti.push(ingrediente);
  }

  ric = await ric.save();
  let ricNome = ric.nome;
  res
    .location("/api/v1/ricette/" + ricNome)
    .status(201)
    .send();
});

router.post("/:nome/ingredienti", async (req, res) => {
  if (
    !req.body.ingredienti ||
    req.body.ingredienti.some(
      (ingrediente) => !ingrediente.nome || !ingrediente.quantita
    )
  ) {
    return res.status(400).json({ error: "Fields must be non-empty" });
  }

  let ric = await ricetta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  for (let i = 0; i < req.body.ingredienti.length; i++) {
    const ingrediente = {
      nome: req.body.ingredienti[i].nome,
      quantita: req.body.ingredienti[i].quantita,
    };

    const existingIngrediente = ric.ingredienti.some(
      (existing) => existing.nome === ingrediente.nome
    );
    if (existingIngrediente) {
      console.log("Ingredient already exists:", ingrediente.nome);
      res
        .status(400)
        .json({ error: "Ingredient already exists: " + ingrediente.nome });
      return;
    }

    ric.ingredienti.push(ingrediente);
  }

  ric = await ric.save();

  res
    .location("/api/v1/ricette/" + ric.nome + "/ingredienti")
    .status(201)
    .send();
});

router.put("/:nome", async (req, res) => {
  let ric = await ricetta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  ric.nome = req.body.nome || ric.nome;
  ric.procedimento = req.body.procedimento || ric.procedimento;

  await ric.save();

  res
    .location("/api/v1/ricette/" + ric.nome + "ingredienti")
    .status(201)
    .send();
});

router.put("/:nome/procedimento", async (req, res) => {
  let ric = await ricetta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  ric.procedimento = req.body.procedimento || ric.procedimento;

  await ric.save();

  res
    .location("/api/v1/ricette/" + ric.nome)
    .status(201)
    .send();
});

router.put("/:nome/ingredienti/:nomeIngrediente", async (req, res) => {
  let ric = await ricetta.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!ric) {
    console.log("Recipe not found");
    res.status(404).json({ error: "Recipe not found" });
    return;
  }

  const ingr = ric.ingredienti.find(
    (ing) => ing.nome === req.params.nomeIngrediente
  );

  if (!ingr) {
    console.log("Ingredient not found");
    res.status(404).json({ error: "Ingredient not found" });
    return;
  }

  ingr.nome = req.body.nome || ingr.nome;
  ingr.quantita = req.body.quantita || ingr.quantita;

  await ric.save();

  res
    .location("/api/v1/ricette/" + ric.nome + "ingredienti")
    .status(201)
    .send();
});

router.delete("/:nome/ingredienti/:nomeIngrediente", async (req, res) => {
  let ric = await ricetta
    .findOne({ nome: req.params.nome, user: req.loggedUser.id })
    .exec();
  if (!ric) {
    res.status(404).json({ error: "Recipe not found" });
    console.log("Recipe not found");
    return;
  }

  const ingr = ric.ingredienti.find(
    (ing) => ing.nome === req.params.nomeIngrediente
  );

  if (!ingr) {
    console.log("Ingredient not found");
    res.status(404).json({ error: "Ingredient not found" });
    return;
  }

  ric.ingredienti.pull(ingr);
  await ric.save();

  console.log("Ingredient removed");
  res.status(204).send();
});

router.delete("/:nome", async (req, res) => {
  let ric = await ricetta
    .findOne({ nome: req.params.nome, user: req.loggedUser.id })
    .exec();
  if (!ric) {
    res.status(404).json({ error: "Recipe not found" });
    console.log("Recipe not found");
    return;
  }
  await ric.deleteOne();
  console.log("Recipe deleted");
  res.status(204).send();
});

module.exports = router;
