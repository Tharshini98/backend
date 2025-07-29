const express = require('express');
const router = express.Router();

const { getProducts, addProduct } = require('../controllers/product.controller');
const { protect } = require('../middlewares/auth.middleware');
const { isSeller } = require('../middlewares/role.middleware'); 

router.get('/', getProducts);
router.post('/add', protect, isSeller, addProduct);

module.exports = router;
