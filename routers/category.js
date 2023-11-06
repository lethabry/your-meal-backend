const router = require('express').Router();

const { getAllCategories, addCategory } = require('../controllers/category');

router.get('/', getAllCategories);
router.post('/', addCategory);

module.exports = router;
