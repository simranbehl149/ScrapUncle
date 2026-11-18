const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice } = req.query;
    const q = {};
    if (category && category !== 'All') q.category = category.trim();
    if (search) q.name = { $regex: search, $options: 'i' };
    if (minPrice || maxPrice) {
      q.price = {};
      if (minPrice) q.price.$gte = Number(minPrice);
      if (maxPrice) q.price.$lte = Number(maxPrice);
    }
    const products = await Product.find(q).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Not found' });
  res.json(product);
};