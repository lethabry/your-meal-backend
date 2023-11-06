const router = require('express').Router();

const { getAllProducts, addProduct, getProductById } = require('../controllers/product');

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:productId', getProductById);

module.exports = router;
