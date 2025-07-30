const express = require("express");
const router = express.Router();
const Product = require("../models/product.model");


router.get("/", async (req, res) => {
  try {
    const { keyword = "", category = "", page = 1, limit = 8 } = req.query;

    const query = {
      name: { $regex: keyword, $options: "i" },
    };

    if (category) {
      query.category = category;
    }

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("seller", "name email") 
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
