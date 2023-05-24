const express = require("express");
const router = express.Router();
const lista = require("./models/lista"); // get our mongoose model
const mongoose = require("mongoose");

router.get("", async (req, res) => {
  let list = await lista.find({ user: req.loggedUser.id });
  if (!list) {
    console.log("lista not found");
    res.status(404).json({ error: "lista not found" });
    return;
  }
  list = list.map((listi) => {
    return {
      self: "/api/v1/liste/" + listi.nome,
      nome: listi.nome,
    };
  });
  res.status(200).json(list);
});

router.get("/:nome", async (req, res) => {
  let list = await lista.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!list) {
    console.log("lista not found");
    res.status(404).json({ error: "lista not found" });
    return;
  }
  res.status(200).json({
    self: "/api/v1/liste/" + list.nome,
    nome: list.nome,
    items: list.items.length,
  });
});

router.get("/:nome/elementi", async (req, res) => {
  let list = await lista.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!list) {
    res.status(404).json({ error: "lista not found" });
    console.log("lista not found");
    return;
  }
  res.status(200).json({
    self: "/api/v1/liste/" + list.nome + "/elementi",
    nome: list.nome,
    items: list.items,
  });
});

router.get("/:nome/elementi/:idElemento", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.idElemento)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  let list = await lista.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });

  if (!list) {
    res.status(404).json({ error: "lista not found" });
    console.log("lista not found");
    return;
  }

  let elemento = list.items.id(req.params.idElemento);

  if (!elemento) {
    res.status(404).json({ error: "elemento not found" });
    console.log("Elemento non trovato");
    return;
  }
  res.status(200).json({
    self: "/api/v1/liste/" + list.nome + "/elementi/" + elemento.id,
    id: elemento.id,
    nome: elemento.nome,
    contrassegno: elemento.contrassegno,
  });
});

router.post("", async (req, res) => {
  if (!req.body.nome) {
    return res
      .status(400)
      .json({ error: "Name of the list must be inserted." });
  }

  const existingLista = await lista.findOne({
    nome: req.body.nome,
    user: req.loggedUser.id,
  });
  if (existingLista) {
    res.status(400).json({ error: "List already exists" });
    return;
  }

  let list = new lista({
    user: req.loggedUser.id,
    nome: req.body.nome,
  });

  list = await list.save();
  let listId = list.id;
  res
    .location("/api/v1/liste/" + listId)
    .status(201)
    .send();
});

router.post("/:nome/elementi", async (req, res) => {
  if (!req.body.items) {
    return res
      .status(400)
      .json({ error: "Name of the element must be inserted." });
  }
  let list = await lista.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });
  if (!list) {
    res.status(404).json({ error: "lista not found" });
    console.log("lista not found");
    return;
  }
  for (var i = 0; i < req.body.items.length; i++) {
    list.items.push({ nome: req.body.items[i], constrassegno: false });

    await list.save();
  }

  res
    .location("/api/v1/liste/" + req.params.nome)
    .status(201)
    .send();
});

router.delete("/:nome", async (req, res) => {
  let list = await lista
    .findOne({ nome: req.params.nome, user: req.loggedUser.id })
    .exec();
  if (!list) {
    res.status(404).json({ error: "lista not found" });
    console.log("lista not found");
    return;
  }
  await list.deleteOne();
  console.log("lista deleted");
  res.status(204).send();
});

router.delete("/:nome/elementi/:idElemento", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.idElemento)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  let list = await lista
    .findOne({ nome: req.params.nome, user: req.loggedUser.id })
    .exec();
  if (!list) {
    res.status(404).json({ error: "lista not found" });
    console.log("lista not found");
    return;
  }

  let elemento = list.items.id(req.params.idElemento);

  if (!elemento) {
    res.status(404).json({ error: "element not found" });
    console.log("Elemento non trovato");
    return;
  }

  list.items.pull(req.params.idElemento);
  await list.save();

  console.log("elemento removed");
  res.status(204).send();
});

router.put("/:nome", async (req, res) => {
  let list = await lista.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });

  if (!list) {
    console.log("lista not found");
    res.status(404).json({ error: "lista not found" });
    return;
  }

  list.nome = req.body.nome || list.nome;

  list = await list.save();

  res
    .location("/api/v1/liste/" + list.nome)
    .status(201)
    .send();
});

router.put("/:nome/elementi/:idElemento", async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.idElemento)) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  let list = await lista.findOne({
    nome: req.params.nome,
    user: req.loggedUser.id,
  });

  if (!list) {
    res.status(404).json({ error: "lista not found" });
    console.log("lista not found");
    return;
  }

  let elemento = list.items.id(req.params.idElemento);

  if (!elemento) {
    res.status(404).json({ error: "element not found" });
    console.log("Elemento non trovato");
    return;
  }

  if (req.body.nome) elemento.nome = req.body.nome;
  if (req.body.contrassegno) elemento.contrassegno = req.body.contrassegno;

  await list.save();

  res
    .location("/api/v1/liste/" + list.nome + "/elementi/" + elemento.id)
    .status(201)
    .send();
});

module.exports = router;
