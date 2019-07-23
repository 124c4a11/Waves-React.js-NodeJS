const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const cloudinary = require('cloudinary');

const User = require('./models/user');
const Brand = require('./models/brand');
const Wood = require('./models/wood');
const Product = require('./models/product');

const auth = require('./middleware/auth');
const admin = require('./middleware/admin');


require('dotenv').config();


const app = express();
const port = process.env.PORT || 3002;


mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true
});


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


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


app.get('/api/users/logout', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    res.json({ success: false, err });
  }
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


app.post('/api/users/uploadimage', auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: 'auto',
    }
  );
});


app.get('/api/users/removeimage', auth, admin, (req, res) => {
  const img_id = req.query.public_id;

  cloudinary.uploader.destroy(img_id, (err, result) => {
    if (err) return res.json({ success: false, err });

    res.status(200).send('ok');
  });
});

app.post('/api/users/update_profile', auth, async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        "$set": req.body
      },
      { new: true }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err });
  }
});


//CART
app.post('/api/users/cart', auth, async (req, res) => {
  const userId = req.user._id
  const { productId } = req.query;

  try {
    const doc = await User.findOne({ _id: userId });

    let newCart = [];

    doc.cart.forEach((item, ndx) => {
      if (item.id == productId) {
        newCart = [
          ...doc.cart.slice(0, ndx),
          {
            ...item,
            quantity: item.quantity + 1
          },
          ...doc.cart.slice(ndx + 1)
        ];
      }
    });

    if (newCart.length) {
      const doc = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          "$set": { "cart": newCart }
        },
        { new: true }
      );

      res.status(200).json(doc.cart);
    } else {
      const doc  = await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cart: {
              id: mongoose.Types.ObjectId(productId),
              quantity: 1,
              date: Date.now()
            }
          }
        },
        { new: true }
      );

      res.status(200).json(doc.cart);
    }
  } catch (err) {
    console.error(err);
    res.json({ success: false, err });
  }
});

app.patch('/api/users/cart', auth, async (req, res) => {
  try {
    const doc = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        "$set": { "cart": req.body.cart }
      },
      { new: true }
    );

    const { cart } = doc;
    const cartIds = cart.map((item) => mongoose.Types.ObjectId(item.id));

    const cartDetail = await Product
      .find({ '_id': { $in: cartIds } })
      .populate('brand')
      .populate('wood');

    res.status(200).json({
      cart,
      cartDetail
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err });
  }
});

app.post('/api/users/checkout', auth, async (req, res) => {
  const history = req.body.cartDetail.map((item) => {
    return {
      dateOfPurchase: Date.now(),
      name: item.name,
      brand: item.brand.name,
      id: item._id,
      price: item.price,
      quantity: item.quantity
    };
  });

  const products = req.body.cartDetail.map(({ _id, quantity }) => {
    return {
      id: _id,
      quantity
    };
  });

  try {
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: { history },
        $set: { cart: [] }
      },
      { new: true }
    );

    products.forEach(async (item) => {
      await Product.update(
        { _id: item.id },
        {
          $inc: {
            "sold": item.quantity
          }
        },
        { new: false }
      );
    });

    res.status(200).json({
      success: true,
      cart: user.cart,
      cartDetail: []
    });
  } catch (err) {
    console.error(err);
    res.json({ success: false, err});
  }
});

app.listen(port, () => console.log(`Server Running at ${port}`));
