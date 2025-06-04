const mongoose = require('mongoose');
// ========== models/Color.js ==========
const colorSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  hex: String
});

module.exports = mongoose.model('Color', colorSchema);
