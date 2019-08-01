const formidable = require('express-formidable');

const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');


const userControllers = require('../controllers/user.controller');


// PROFILE
router.post(
  '/register',
  userControllers.register
);


router.get(
  '/auth',
  auth,
  userControllers.auth
);


router.get(
  '/logout',
  auth,
  userControllers.logout
);


router.post(
  '/login',
  userControllers.login
);


router.patch(
  '/reset_password',
  userControllers.resetPassword
);


router.patch(
  '/change_password',
  userControllers.changePassword
);


router.patch(
  '/update_profile',
  auth,
  userControllers.updateProfile
);


// IMAGES
router.post(
  '/uploadimage',
  auth,
  admin,
  formidable(),
  userControllers.uploadImage
);


router.delete(
  '/removeimage',
  auth,
  admin,
  userControllers.removeImage
);


// CART
router.post(
  '/cart',
  auth,
  userControllers.addToCart
);


router.patch(
  '/cart',
  auth,
  userControllers.updateCart
);


router.post(
  '/checkout',
  auth,
  userControllers.checkout
);


module.exports = router;
