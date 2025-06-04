const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { deleteBrand, getAllBrands, createBrand, updateBrand } = require('../controllers/brandController');
const { uploadBrandImage } = require('../middleware/uploadMiddleware');
const router = express.Router();

// get All brands
router.get('/',protect,getAllBrands);
//create brand
router.post('/',protect,uploadBrandImage.single('brandImg'),createBrand);
//update brand
router.put('/:id',protect,uploadBrandImage.single("brandImg"),updateBrand);
//delete brand
router.delete('/:id',protect,deleteBrand);

module.exports = router;