const Pickup = require('../models/Pickup');
const User = require('../models/User');

const RATES = { Paper: 12, Plastic: 18, Metal: 45, Cardboard: 10, Glass: 6, 'E-Waste': 60 };

exports.createPickup = async (req, res) => {
  try {
    const { category, weight, address, preferredDate, contactNumber, notes, images } = req.body;
    if (!category || !weight || !preferredDate || !contactNumber) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const amount = RATES[category] * parseFloat(weight);

    const pickup = await Pickup.create({
      userId: req.user._id,
      category,
      weight: parseFloat(weight),
      address,
      preferredDate: new Date(preferredDate),
      contactNumber,
      notes,
      images: images || [],
      amount,
    });

    await User.findByIdAndUpdate(req.user._id, { $inc: { totalPickups: 1 } });

    res.status(201).json(pickup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getUserPickups = async (req, res) => {
  try {
    const pickups = await Pickup.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.cancelPickup = async (req, res) => {
  try {
    const pickup = await Pickup.findById(req.params.id);
    if (!pickup) return res.status(404).json({ message: 'Pickup not found' });
    if (pickup.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (!['Pending', 'Scheduled'].includes(pickup.status)) {
      return res.status(400).json({ message: 'Cannot cancel this pickup' });
    }
    pickup.status = 'Cancelled';
    await pickup.save();
    res.json(pickup);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};