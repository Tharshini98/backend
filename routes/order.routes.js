const express = require('express');
const router = express.Router();

const {
  placeOrder,
  getBuyerOrders,
  getSellerOrders,
} = require('../controllers/order.controller');

const { protect } = require('../middlewares/auth.middleware');


router.post('/place', protect, placeOrder);
router.get('/buyer', protect, getBuyerOrders);

router.get('/seller', protect, getSellerOrders);

module.exports = router;
