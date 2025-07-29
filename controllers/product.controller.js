const Product = require('../models/product.model');

const addProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, seller: req.user._id });
  res.status(201).json(product);
};

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};

const deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct
};
