const Order = require('../models/order.model');

const placeOrder = async (req, res) => {
  const order = await Order.create({
    user: req.user._id,
    items: req.body.items,
    total: req.body.total,
  });
  res.status(201).json(order);
};

const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate('items.product');
  res.json(orders);
};

module.exports = {
  placeOrder,
  getOrders,
};
