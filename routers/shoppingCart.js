const router = require('express').Router();

const {
  getAllShoppingCartList,
  addProductToShoppingCart,
  handleAmountProductInShoppingCart,
  deleteProductFromShoppingCart,
  cleanShoppingCart,
} = require('../controllers/shoppingCart');
const {
  addProductToShoppingCartValidation,
  handleAmountProductInShoppingCartValidation,
  deleteProductFromShoppingCartValidation,
  cleanShoppingCartValidation,
} = require('../middlewares/validation');

router.get('/', getAllShoppingCartList);
router.post('/', addProductToShoppingCartValidation, addProductToShoppingCart);
router.patch('/:productId', handleAmountProductInShoppingCartValidation, handleAmountProductInShoppingCart);
router.delete('/:productId', deleteProductFromShoppingCartValidation, deleteProductFromShoppingCart);
router.delete('/', cleanShoppingCartValidation, cleanShoppingCart);

module.exports = router;
