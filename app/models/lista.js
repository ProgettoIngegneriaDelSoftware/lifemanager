var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const listItemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  contrassegno: { type: Boolean, default: false },
});

module.exports = mongoose.model(
  "liste",
  new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    nome: { type: String, required: true },
    items: [listItemSchema],
  }),
  "liste"
);
