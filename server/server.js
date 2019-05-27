const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const User = require('./models/user');

const auth = require('./middleware/auth');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// USERS
app.get('/api/users/auth', auth, async (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history
  });
});


app.post('/api/users/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
});


app.post('/api/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ 'email': req.body.email });

    if (!user) {
      return res.status(404).json({
        loginSuccess: false,
        message: 'Auth faile, email not found!'
      });
    }

    const isMatch = await user.comparePassword(req.body.password);

    if (!isMatch) {
      return res.status(400).json({
        loginSuccess: false,
        message: 'Wrong password!'
      });
    }

    const token = await user.generateToken();

    user.token = token;

    await user.save();

    res.status(200).cookie('w_auth', user.token).json({
      loginSuccess: true
    });
  } catch (err) {
    res.status(400).json(err);
  }
});


app.listen(port, () => console.log(`Server Running at ${port}`));
