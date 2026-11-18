const Pickup = require('../models/Pickup');
const Order = require('../models/Order');
const User = require('../models/User');

exports.getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    const pickups = await Pickup.find({ userId });
    const completed = pickups.filter((p) => p.status === 'Completed');
    const totalEarnings = completed.reduce((s, p) => s + p.amount, 0);
    const totalWaste = completed.reduce((s, p) => s + p.weight, 0);
    const totalCO2Saved = Math.round(totalWaste * 0.4);

    await User.findByIdAndUpdate(userId, {
      totalEarnings,
      totalPickups: pickups.length,
    });

    const recentPickups = pickups.sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);
    const recentOrders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(5);

    res.json({
      totalEarnings,
      totalPickups: pickups.length,
      completedPickups: completed.length,
      totalWaste,
      totalCO2Saved,
      recentPickups,
      recentOrders,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};