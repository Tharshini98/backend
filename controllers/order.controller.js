import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

// Create a new order (Buyer)
export const placeOrder = async (req, res) => {
  try {
    const { cartItems, totalAmount, shippingInfo } = req.body;

    if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    const orderItems = await Promise.all(
      cartItems.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);
        return {
          product: product._id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          seller: product.seller,
        };
      })
    );

    const order = new Order({
      buyer: req.user.id,
      orderItems,
      totalAmount,
      shippingInfo,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for buyer
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ buyer: req.user.id }).populate("orderItems.product", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all orders for a seller
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ "orderItems.seller": req.user.id }).populate("orderItems.product", "name price");

    const sellerOrders = orders.map((order) => {
      const items = order.orderItems.filter(
        (item) => item.seller.toString() === req.user.id
      );
      return {
        _id: order._id,
        buyer: order.buyer,
        shippingInfo: order.shippingInfo,
        totalAmount: order.totalAmount,
        createdAt: order.createdAt,
        orderItems: items,
      };
    });

    res.json(sellerOrders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
