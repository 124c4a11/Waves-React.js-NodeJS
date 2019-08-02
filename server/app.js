const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');
const siteRoutes = require('./routes/site.routes');

const app = express();


require('dotenv').config();


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


app.use(express.static('client/build'));


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/site', siteRoutes);


if (process.env.NODE_ENV === 'production') {
  app.get('/*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  });
}


module.exports = app;
