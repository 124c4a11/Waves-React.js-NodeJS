const { Router } = require('express');
const router = Router();

const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

const siteController = require('../controllers/site.controller');


router.get(
  '/site_data',
  siteController.getData
);


router.post(
  '/site_data',
  auth,
  admin,
  siteController.updateData
);


module.exports = router;
