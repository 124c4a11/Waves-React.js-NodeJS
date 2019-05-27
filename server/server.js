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


app.listen(port, () => console.log(`Server Running at ${port}`));
