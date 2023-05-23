var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  "carte",
  new Schema({
    user: { type: Schema.Types.ObjectId, ref: "Users" },
    nome: {
      type: String,
      required: true,
    },
    numerocarta: {
      type: String,
      required: true,
    },
  }),
  "cartefedelta"
);
