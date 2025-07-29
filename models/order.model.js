const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: Number
    }
  ],
  totalAmount: Number,
  status: { type: String, default: 'Pending' },
  shippingInfo: {
    address: String,
    phone: String,
    city: String,
    postalCode: String
  },
  paymentId: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
