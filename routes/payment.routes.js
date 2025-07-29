const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/payment.controller');


router.post('/create-order', paymentController.createPaymentIntent);

module.exports = router;
