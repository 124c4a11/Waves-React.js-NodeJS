const mongoose = require('mongoose');


const woodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: 1,
    maxlength: 100
  }
});


module.exports = mongoose.model('Wood', woodSchema);
