const ShoppingCart = require('../models/shoppingCart');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');

const getAllShoppingCartList = (req, res, next) => {
  ShoppingCart.find({})
    .then((shoppingCartList) => res.send({ shoppingCartList }))
    .catch(next);
};

const addProductToShoppingCart = (req, res, next) => {
  const {
    name,
    image,
    price,
    weight,
    structure,
  } = req.body;
  ShoppingCart.create({
    name, image, price, weight, structure,
  })
    .then((product) => res.send({ product }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданны некоррекные данные при добавлении товара в корзину'));
      }
      return next(err);
    });
};

const handleAmountProductInShoppingCart = (req, res, next) => {
  const count = req.body.amount;
  ShoppingCart.findByIdAndUpdate(req.params.productId, { amount: count }, { new: true })
    .then((product) => {
      if (!product) {
        throw new NotFoundError('Такого товара в корзине нет');
      }
      return res.send({ product });
    })
    .catch(next);
};

const deleteProductFromShoppingCart = (req, res, next) => {
  ShoppingCart.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (!product) {
        throw new NotFoundError('Такого товара в корзине нет');
      }
      return res.send({ message: 'Товар успешно удалён из корзины' });
    })
    .catch(next);
};

module.exports = {
  getAllShoppingCartList,
  addProductToShoppingCart,
  handleAmountProductInShoppingCart,
  deleteProductFromShoppingCart,
};
