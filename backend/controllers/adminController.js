const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const User = require('../models/User');
const Pickup = require('../models/Pickup');
const Product = require('../models/Product');
const Order = require('../models/Order');

const sign = (id) =>
  jwt.sign({ id, isAdmin: true }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '30d',
  });

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin || !(await admin.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    res.json({
      _id: admin._id,
      fullName: admin.fullName,
      email: admin.email,
      role: admin.role,
      token: sign(admin._id),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  const [totalUsers, totalPickups, completedPickups, pendingPickups, totalProducts, totalOrders] =
    await Promise.all([
      User.countDocuments(),
      Pickup.countDocuments(),
      Pickup.countDocuments({ status: 'Completed' }),
      Pickup.countDocuments({ status: 'Pending' }),
      Product.countDocuments(),
      Order.countDocuments(),
    ]);
  const pickups = await Pickup.find({ status: 'Completed' });
  const totalRevenue = pickups.reduce((s, p) => s + p.amount, 0);
  const totalWasteRecycled = pickups.reduce((s, p) => s + p.weight, 0);

  res.json({
    totalUsers,
    totalPickups,
    completedPickups,
    pendingPickups,
    totalProducts,
    totalOrders,
    totalRevenue,
    totalWasteRecycled,
    totalCO2Saved: Math.round(totalWasteRecycled * 0.4),
  });
};

// Users
exports.getAllUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 }).select('-password');
  res.json({ users });
};
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
};

// Pickups
exports.getAllPickups = async (req, res) => {
  const pickups = await Pickup.find().populate('userId', 'fullName email').sort({ createdAt: -1 });
  res.json({ pickups });
};
exports.updatePickupStatus = async (req, res) => {
  const pickup = await Pickup.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(pickup);
};
exports.deletePickup = async (req, res) => {
  await Pickup.findByIdAndDelete(req.params.id);
  res.json({ message: 'Pickup deleted' });
};

// Products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
};
exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
};
exports.updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(product);
};
exports.deleteProduct = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.json({ message: 'Product deleted' });
};

// Orders
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('userId', 'fullName email').sort({ createdAt: -1 });
  res.json(orders);
};
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
  res.json(order);
};
exports.deleteOrder = async (req, res) => {
  await Order.findByIdAndDelete(req.params.id);
  res.json({ message: 'Order deleted' });
};