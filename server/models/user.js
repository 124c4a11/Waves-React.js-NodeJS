const mongoose = require('mongoose');
const moment = require('moment');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
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
  },

  resetToken: {
    type: String
  },

  resetTokenExp: {
    type: Number
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


userSchema.methods.generateResetToken = function(cb) {
  let user = this;

  crypto.randomBytes(20, async function(err, buffer) {
    if (err) return cb(err);

    const token = buffer.toString('hex');
    const today = moment().startOf('day').valueOf();
    const tomorrow = moment(today).endOf('day').valueOf();

    user.resetToken = token;
    user.resetTokenExp = tomorrow;

    const updatedUser = await user.save({});

    cb(null, updatedUser);
  });
};


userSchema.statics.findByToken = async function(token) {
  const user = this;
  const decode = jwt.verify(token, process.env.SECRET);

  return await user.findOne({ "_id": decode, "token": token });
};


module.exports = mongoose.model('User', userSchema);
