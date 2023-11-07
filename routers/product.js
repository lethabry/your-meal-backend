const router = require('express').Router();

const { getAllProducts, addProduct, getProductById } = require('../controllers/product');
const { addProductValidation, getProductByIdValidation } = require('../middlewares/validation');

router.get('/', getAllProducts);
router.post('/', addProductValidation, addProduct);
router.get('/:productId', getProductByIdValidation, getProductById);

module.exports = router;
