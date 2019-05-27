const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const SALT_I = 10;


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1
  },

  password: {
    type: String,
    required: true,
    minlength: 5
  },

  name: {
    type: String,
    required: true,
    maxlength: 100
  },

  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },

  cart: {
    type: Array,
    default: []
  },

  history: {
    type: Array,
    default: []
  },

  role: {
    type: Number,
    default: 0
  },

  token: {
    type: String
  }
});


userSchema.pre('save', async function(next) {
  const user = this;

  try {
    const salt = await bcrypt.genSalt(SALT_I);
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
  } catch (err) {
    next(err);
  }
});


module.exports = mongoose.model('User', userSchema);
