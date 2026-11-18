const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    orderId: { type: String, unique: true },
    products: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
        name: String,
        quantity: Number,
        price: Number,
        image: String,
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: {
      fullName: String,
      houseNo: String,
      street: String,
      city: String,
      pincode: String,
      phone: String,
    },
    paymentMethod: {
      type: String,
      enum: ['UPI', 'Card', 'Cash on Delivery'],
      default: 'Cash on Delivery',
    },
    status: {
      type: String,
      enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

orderSchema.pre('save', async function (next) {
  if (this.orderId) return next();
  const count = await mongoose.model('Order').countDocuments();
  this.orderId = `ORD-${1001 + count}`;
  next();
});

module.exports = mongoose.model('Order', orderSchema);