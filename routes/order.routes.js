const express = require('express');
const router = express.Router();

const { placeOrder, getOrders } = require('../controllers/order.controller');
const { protect } = require('../middlewares/auth.middleware');

router.post('/place', protect, placeOrder);  // <- Error may be here
router.get('/', protect, getOrders);

module.exports = router;
