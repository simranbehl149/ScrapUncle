const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    category: {
      type: String,
      required: true,
      enum: ['Furniture', 'Decor', 'Stationery', 'Planters', 'Bags', 'Electronics'],
    },
    stock: { type: Number, required: true, default: 0 },
    image: { type: String },
    images: [{ type: String }],
    material: { type: String },
    rating: { type: Number, default: 4.5 },
    isSoldOut: { type: Boolean, default: false },
    reviews: { type: [reviewSchema], default: [] },
    specs: {
      type: Map,
      of: String,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);