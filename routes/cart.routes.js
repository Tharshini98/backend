const express = require('express');
const router = express.Router();

const { getCart, updateCart, clearCart } = require('../controllers/cart.controller');
const { protect } = require('../middlewares/auth.middleware');


router.get('/', protect, getCart);


router.post('/add', protect, updateCart);


router.delete('/clear', protect, clearCart);

module.exports = router;
