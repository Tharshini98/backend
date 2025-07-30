const Product = require('../models/product.model');


const addProduct = async (req, res) => {
  try {
    const product = await Product.create({ ...req.body, seller: req.user._id });
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to add product", error: err.message });
  }
};


const getProducts = async (req, res) => {
  try {
    const { category, page = 1, limit = 8 } = req.query;
    const query = category ? { category } : {};

    const products = await Product.find(query)
      .populate('seller', 'name') 
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 }); 

    const total = await Product.countDocuments(query);

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products", error: err.message });
  }
};


const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('seller', 'name');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch product", error: err.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete product", error: err.message });
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProductById,
  deleteProduct,
};
