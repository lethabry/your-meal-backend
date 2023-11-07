const router = require('express').Router();

const { getAllCategories, addCategory } = require('../controllers/category');
const { addCategoryValidation } = require('../middlewares/validation');

router.get('/', getAllCategories);
router.post('/', addCategoryValidation, addCategory);

module.exports = router;
