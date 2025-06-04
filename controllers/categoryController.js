const Category = require('../models/Category');
const path = require('path');
const saveBase64Image = require('../utils/saveBase64Image'); // Utility function

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    const { name, parent, image:base64Image } = req.body;

    if (!name) {
      res.status(400);
      throw new Error('Category name is required');
    }

    let image = null;
    if (base64Image) {
      image = saveBase64Image(base64Image, 'categories'); // returns filename
    }

    const newCategory = new Category({
      name,
      parent: parent || null,
      image
    });

    const savedCategory = await newCategory.save();
    res.status(201).json({Message:"Category Added Successfully",savedCategory});
  } catch (err) {
    next(err);
  }
};

// Get all categories
const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate('parent', 'name');
    res.status(200).json({Message:"Successfully fetched all categories",data:categories});
  } catch (err) {
    next(err);
  }
};

// Update a category
const updateCategory = async (req, res, next) => {
  try {
    const { name, parent, image } = req.body;

    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    category.name = name || category.name;
    category.parent = parent !== undefined ? parent : category.parent;

    if (image) {
      const newImage = saveBase64Image(image, 'categories');
      category.image = newImage;
    }

    const updatedCategory = await category.save();
    res.status(200).json(updatedCategory);
  } catch (err) {
    next(err);
  }
};

// Delete a category
const deleteCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404);
      throw new Error('Category not found');
    }

    await category.deleteOne();
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
};
