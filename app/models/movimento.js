var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// set up a mongoose model
module.exports = mongoose.model(
  "movimenti",
  new Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "Users",
      },
      titolo: {
        type: String,
        required: true,
      },
      importo: {
        type: Number,
        required: true,
      },
      tipologia: {
        type: String,
        enum: ["entrata", "uscita"],
        required: true,
      },
      categoria: {
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        //type: String,
        required: true,
      },
      note: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { collection: "movimenti" }
  )
);
