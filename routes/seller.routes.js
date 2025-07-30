
const express = require('express');
const { protect } = require('../middlewares/auth.middleware');
const { getSellerDashboard } = require('../controllers/seller.controller');

const router = express.Router();

router.get('/dashboard', protect, getSellerDashboard);

module.exports = router;