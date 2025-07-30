const express = require("express");
const {
  placeOrder,
  getMyOrders,
  getSellerOrders,
} = require("../controllers/order.controller");
const verifyToken = require("../middlewares/verifyToken");


const router = express.Router();

router.post("/", verifyToken, placeOrder);
router.get("/", verifyToken, getMyOrders);
router.get("/seller", verifyToken, getSellerOrders);

module.exports = router;
