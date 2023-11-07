const router = require('express').Router();

const {
  getAllShoppingCartList,
  addProductToShoppingCart,
  handleAmountProductInShoppingCart,
  deleteProductFromShoppingCart,
} = require('../controllers/shoppingCart');
const {
  addProductToShoppingCartValidation,
  handleAmountProductInShoppingCartValidation,
  deleteProductFromShoppingCartValidation,
} = require('../middlewares/validation');

router.get('/', getAllShoppingCartList);
router.post('/', addProductToShoppingCartValidation, addProductToShoppingCart);
router.patch('/:productId', handleAmountProductInShoppingCartValidation, handleAmountProductInShoppingCart);
router.delete('/:productId', deleteProductFromShoppingCartValidation, deleteProductFromShoppingCart);

module.exports = router;
