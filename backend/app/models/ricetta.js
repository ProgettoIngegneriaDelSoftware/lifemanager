var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports= mongoose.model('ricette',  new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'Users'},
  nome: {
    type: String,
    required: true
  },
  ingredienti: [{
    type: String,
    required: true
  }],
  procedimento: {
    type: String,
    required: true
  }
}), "ricette")