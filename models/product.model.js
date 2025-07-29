const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  image: String,
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
