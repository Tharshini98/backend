const Product = require('../models/product.model');
const Order = require('../models/order.model');

const getSellerDashboard = async (req, res) => {
  try {
    const sellerId = req.user._id;

    
    const sellerProducts = await Product.find({ seller: sellerId });
    const sellerProductIds = sellerProducts.map(p => p._id.toString());

    
    const allOrders = await Order.find();

    let totalOrders = 0;
    let totalSales = 0;


    for (const order of allOrders) {
      const sellerOrderItems = order.products.filter(item =>
        sellerProductIds.includes(item.product.toString())
      );

      if (sellerOrderItems.length > 0) {
        totalOrders++;

        for (const item of sellerOrderItems) {
          const product = sellerProducts.find(p => p._id.toString() === item.product.toString());
          if (product) {
            totalSales += product.price * item.quantity;
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      message: 'Seller dashboard data fetched successfully',
      data: {
        totalProducts: sellerProducts.length,
        totalOrders,
        totalSales,
        products: sellerProducts
      }
    });
  } catch (error) {
    console.error('Error in getSellerDashboard:', error.message);
    return res.status(500).json({ success: false, message: 'Server Error' });
  }
};

module.exports = { getSellerDashboard };
