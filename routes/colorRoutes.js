const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
const colorController = require('../controllers/colorController');

router.get('/',protect,colorController.getAllColors);
router.post('/',protect,colorController.createColor);
router.put('/:id',protect,colorController.updateColor);
router.delete('/:id',protect,colorController.deleteColor);

module.exports = router;