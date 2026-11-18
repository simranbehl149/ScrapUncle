const mongoose = require('mongoose');

const pickupSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    pickupId: { type: String, unique: true },
    category: {
      type: String,
      required: true,
      enum: ['Paper', 'Plastic', 'Metal', 'Cardboard', 'Glass', 'E-Waste'],
    },
    weight: { type: Number, required: true },
    address: {
      houseNo: String,
      street: String,
      city: String,
      pincode: String,
    },
    preferredDate: { type: Date, required: true },
    contactNumber: { type: String, required: true },
    notes: String,
    images: [String],
    amount: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['Pending', 'Scheduled', 'Completed', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

pickupSchema.pre('save', async function (next) {
  if (this.pickupId) return next();
  const count = await mongoose.model('Pickup').countDocuments();
  this.pickupId = `P-${1001 + count}`;
  next();
});

module.exports = mongoose.model('Pickup', pickupSchema);