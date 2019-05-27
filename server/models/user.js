const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SALT_I = 10;

require('dotenv').config();


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

  if (user.isModified('password')) {
    try {
      const salt = await bcrypt.genSalt(SALT_I);
      const hash = await bcrypt.hash(user.password, salt);

      user.password = hash;

      next();
    } catch (err) {
      next(err);
    }
  } else {
    next();
  }
});


userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};


userSchema.methods.generateToken = function() {
  const user = this;

  return jwt.sign(user._id.toHexString(), process.env.SECRET);
};


userSchema.statics.findByToken = async function(token) {
  const user = this;
  const decode = jwt.verify(token, process.env.SECRET);

  return await user.findOne({ "_id": decode, "token": token });
};


module.exports = mongoose.model('User', userSchema);
