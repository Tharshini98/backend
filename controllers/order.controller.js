const Order = require('../models/order.model');
const Product = require('../models/product.model');


const placeOrder = async (req, res) => {
  try {
    const { products, totalAmount, shippingInfo, paymentId } = req.body;

   
    const validatedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product);
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }
        return {
          product: product._id,
          quantity: item.quantity,
        };
      })
    );

    const order = await Order.create({
      buyer: req.user._id,
      products: validatedProducts,
      totalAmount,
      shippingInfo,
      paymentId,
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ message: error.message });
  }
};

const getBuyerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user._id })
      .populate('products.product', 'name price image')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching buyer orders:", error);
    res.status(500).json({ message: error.message });
  }
};


const getSellerOrders = async (req, res) => {
  try {
    const sellerId = req.user._id;


    const sellerProducts = await Product.find({ seller: sellerId }).select('_id');

    const productIds = sellerProducts.map((p) => p._id);

    const orders = await Order.find({ 'products.product': { $in: productIds } })
      .populate('buyer', 'name email')
      .populate('products.product', 'name price image seller')
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (error) {
    console.error("Error fetching seller orders:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  placeOrder,
  getBuyerOrders,
  getSellerOrders,
};
