const Product = require('../models/Product');
const saveBase64Image = require('../utils/saveBase64Image'); // utility function we wrote earlier

exports.createProduct = async (req, res) => {
  try {
    const {
      name,
      category,
      sizes,
      colors,
      actualPrice,
      offerPrice,
      offerPercent,
      description,
      base64Images // Array of base64 strings
    } = req.body;

    if (!base64Images || !Array.isArray(base64Images) || base64Images.length === 0) {
      return res.status(400).json({ message: 'No images provided in base64Images array' });
    }

    const imagePaths = base64Images.map(base64 =>
      `/uploads/products/${saveBase64Image(base64, 'products')}`
    );

    const product = new Product({
      name,
      category,
      sizes: JSON.parse(sizes),
      colors: JSON.parse(colors),
      actualPrice,
      offerPrice,
      offerPercent,
      description,
      images: imagePaths
    });

    await product.save();
    res.status(201).json({ message: 'Product created', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create product' });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category')
      .populate('colors');
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};
