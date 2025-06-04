// ========== routes/productRoutes.js ==========
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Upload max 5 images
router.post('/',protect,upload.uploadProductImages.array('images', 5), productController.createProduct);
router.get('/',protect, productController.getAllProducts);

module.exports = router;