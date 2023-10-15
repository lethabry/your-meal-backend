const router = require('express').Router();

const { getAllProducts, addProduct } = require('../controllers/product');

router.get('/', getAllProducts);

router.post('/', addProduct);

module.exports = router;
