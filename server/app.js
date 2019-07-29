const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');


const Brand = require('./models/brand');
const Wood = require('./models/wood');
const Product = require('./models/product');


const userRoutes = require('./routes/user.routes');
const siteRoutes = require('./routes/site.routes');


const auth = require('./middleware/auth');
const admin = require('./middleware/admin');


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


// PRODUCTS
app.post('/api/product/article', auth, admin, async (req, res) => {
  const product = new Product(req.body);

  try {
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (err) {
    res.json({ success: false, err });
  }
});


// /api/product?id=APSHDFPAJSDPF,ASDPFOAJSPDADF&type=array
app.get('/api/product', async (req, res) => {
  let type = req.query.type;
  let items = req.query.id;

  if (!items) return;

  if (type === "array") {
    const ids = req.query.id.split(',');
    items = [];
    items = ids.map((item) => mongoose.Types.ObjectId(item));
  }

  try {
    const products = await Product
      .find({ '_id': { $in: items } })
      .populate('brand')
      .populate('wood');

    res.status(200).send(products);
  } catch (err) {
    res.send(err);
  }
});


// by arrival: /articles?sortBy=createdAt&order=desc&limit=4
// by sell: /articles?sortBy=sold&order=desc&limit=5
app.get('/api/product/articles', async (req, res) => {
  const order = req.query.order ? req.query.order : 'asc';
  const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;

  try {
    const products = await Product
      .find({})
      .populate('brand')
      .populate('wood')
      .sort([[ sortBy, order ]])
      .limit(limit);

    res.status(200).send(products);
  } catch (err) {
    res.status(400).send(err);
  }
});


// WOODS
app.post('/api/product/wood', auth, admin, async (req, res) => {
  const wood = new Wood(req.body);

  try {
    await wood.save();

    res.status(200).json({ success: true, wood });
  } catch (err) {
    res.json({ success: false, err });
  }
});


app.get('/api/product/woods', async (req, res) => {
  try {
    const woods = await Wood.find({});

    res.status(200).send(woods);
  } catch (err) {
    res.status(400).send(err);
  }
});


// BRAND
app.get('/api/product/brands', async (req, res) => {
  try {
    const brands = await Brand.find({});

    res.status(200).send(brands);
  } catch (err) {
    res.status(400).send(err);
  }
});


app.post('/api/product/brand', auth, admin, async (req, res) => {
  const brand = new Brand(req.body);

  try {
    await brand.save();

    res.status(200).json({ success: true, brand });
  } catch (err) {
    res.json({ success: false, err });
  }
});


//SHOP
app.post('/api/product/shop', async (req, res) => {
  const order = req.body.order ? req.body.order : 'desc';
  const sortBy = req.body.sortBy ? req.body.sortBy : '_id';
  const limit = req.body.limit ? parseInt(req.body.limit) : 100;
  const skip = parseInt(req.body.skip);

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length) {
      if (key === 'price') {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1]
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs['publish'] = true;

  try {
    const articles = await Product
      .find(findArgs)
      .populate('brand')
      .populate('wood')
      .sort([[ sortBy, order ]])
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      size: articles.length,
      articles
    });
  } catch (err) {
    res.status(400).send(err);
  }
});



app.use('/api/users', userRoutes);

app.use('/api/site', siteRoutes);


module.exports = app;
