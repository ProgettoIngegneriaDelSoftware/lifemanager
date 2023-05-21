var mongoose = require("mongoose");
var Schema = mongoose.Schema;

module.exports = mongoose.model(
  "categoria_movimenti",
  new Schema({
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    nome: {
      type: String,
      required: true,
    },
  }),
  "categoria_movimenti"
);
