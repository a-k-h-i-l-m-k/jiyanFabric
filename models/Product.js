const mongoose = require('mongoose');
// ========== models/Product.js ==========
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  sizes: [String],
  colors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Color' }],
  actualPrice: { type: Number, required: true },
  offerPrice: { type: Number, required: true },
  offerPercent: { type: Number },
  description: String,
  images: [String], // URLs or file names
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);