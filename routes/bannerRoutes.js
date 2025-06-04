const express = require('express');
const { uploadBannerImage } = require('../middleware/uploadMiddleware');
const { getAllBanners, createBanner, updateBanner, deleteBanner } = require('../controllers/bannerController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// get all banners
router.get('/',protect,getAllBanners);
// create Banner
router.post('/',protect,uploadBannerImage.single('bannerImg'),createBanner);
// update Banner
router.put('/:id',protect,uploadBannerImage.single('bannerImg'),updateBanner);
// delete Banner
router.delete('/:id',protect,deleteBanner);

module.exports = router;
