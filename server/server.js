const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// Models
const User = require('./models/user');


// USERS
app.post('/api/users/register', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).json({
      success: true,
      userdata: user
    });
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
