const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


const productControllers = require('../controllers/product.controller');


router.post(
  '/article',
  auth,
  admin,
  productControllers.addProduct
);


// /api/product?id=APSHDFPAJSDPF,ASDPFOAJSPDADF&type=array
router.get(
  '',
  productControllers.getProductDetails
);


// by arrival: /articles?sortBy=createdAt&order=desc&limit=4
// by sell: /articles?sortBy=sold&order=desc&limit=5
router.get(
  '/articles',
  productControllers.getProducts
);


router.post(
  '/shop',
  productControllers.getProductsForShop
);


router.post(
  '/wood',
  auth,
  admin,
  productControllers.addWood
);


router.get(
  '/woods',
  productControllers.getWood
);


router.post(
  '/brand',
  auth,
  admin,
  productControllers.addBrand
);


router.get(
  '/brands',
  productControllers.getBrands
);


module.exports = router;
