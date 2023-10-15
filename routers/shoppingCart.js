const router = require('express').Router();
const {
  getAllShoppingCartList,
  addProductToShoppingCart,
  handleAmountProductInShoppingCart,
  deleteProductFromShoppingCart,
} = require('../controllers/shoppingCart');

router.get('/', getAllShoppingCartList);
router.post('/', addProductToShoppingCart);
router.patch('/:productId', handleAmountProductInShoppingCart);
router.delete('/:productId', deleteProductFromShoppingCart);

module.exports = router;
