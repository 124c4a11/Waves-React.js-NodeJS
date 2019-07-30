const express = require('express');
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


app.use('/api/users', userRoutes);
app.use('/api/product', productRoutes);
app.use('/api/site', siteRoutes);


module.exports = app;
