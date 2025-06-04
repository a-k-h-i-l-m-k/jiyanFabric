
const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { uploadCategoryImage } = require('../middleware/uploadMiddleware');
const { protect } = require('../middleware/authMiddleware');

// Create category
router.post('/', protect, uploadCategoryImage.single('image'), categoryController.createCategory);

// Get all categories
router.get('/', protect, categoryController.getAllCategories);

// Update category
router.put('/:id', protect, uploadCategoryImage.single('image'), categoryController.updateCategory);

// Delete category
router.delete('/:id', protect, categoryController.deleteCategory);

module.exports = router;
