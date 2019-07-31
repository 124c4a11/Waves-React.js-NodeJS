const cloudinary = require('cloudinary');
const mongoose = require('mongoose');

const { sendEmail } = require('../utils/mail');

const User = require('../models/user');
const Product = require('../models/product');


require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});


module.exports.register = async (req, res) => {
  const user = new User(req.body);

  try {
    const doc = await user.save();

    sendEmail(doc.email, doc.name, null, 'welcome');

    res.status(201).json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, err });
  }
};


module.exports.auth = async (req, res) => {
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
};


module.exports.login = async (req, res) => {
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
};


module.exports.logout = async (req, res) => {
  try {
    await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );

    res.status(200).send({ success: true });
  } catch (err) {
    res.json({ success: false, err });
  }
};


module.exports.updateProfile = async (req, res) => {
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
};


// IMAGES
module.exports.uploadImage = (req, res) => {
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
};


module.exports.removeImage = (req, res) => {
  const img_id = req.query.public_id;

  cloudinary.uploader.destroy(img_id, (err, result) => {
    if (err) return res.json({ success: false, err });

    res.status(200).send('ok');
  });
};


// CART
module.exports.addToCart = async (req, res) => {
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
};


module.exports.updateCart = async (req, res) => {
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
};


module.exports.checkout = async (req, res) => {
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
};
