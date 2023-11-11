const ShoppingCart = require('../models/shoppingCart');
const NotFoundError = require('../utils/errors/NotFoundError');
const ValidationError = require('../utils/errors/ValidationError');

const getAllShoppingCartList = (req, res, next) => {
  const owner = req.cookies.sessionId;
  ShoppingCart.find({ owner })
    .then((shoppingCartList) => res.send(shoppingCartList))
    .catch(next);
};

const addProductToShoppingCart = (req, res, next) => {
  const owner = req.cookies.sessionId;
  const {
    name,
    image,
    price,
    weight,
    structure,
    category,
    description,
  } = req.body;
  ShoppingCart.create({
    owner, name, image, price, weight, structure, category, description,
  })
    .then((product) => res.send(product))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new ValidationError('Переданны некоррекные данные при добавлении товара в корзину'));
      }
      return next(err);
    });
};

const handleAmountProductInShoppingCart = (req, res, next) => {
  const owner = req.cookies.sessionId;
  const count = req.body.amount;
  ShoppingCart.findById(req.params.productId)
    .then((product) => {
      if (product.owner === owner) {
        ShoppingCart.findByIdAndUpdate(req.params.productId, { amount: count }, { new: true })
          .then((updatedProduct) => res.send(updatedProduct))
          .catch(next);
      } else {
        throw new NotFoundError('Такого товара в корзине нет');
      }
    })
    .catch(next);
};

const deleteProductFromShoppingCart = (req, res, next) => {
  const owner = req.cookies.sessionId;
  ShoppingCart.findById(req.params.productId)
    .then((product) => {
      if (!product) {
        throw new NotFoundError('Такого товара в корзине нет');
      }
      if (product.owner === owner) {
        ShoppingCart.findByIdAndRemove(req.params.productId)
          .then(() => res.status(200).send({ message: 'Товар успешно удалён из корзины' }))
          .catch(next);
      } else {
        throw new NotFoundError('Такого товара в корзине нет');
      }
    })
    .catch(next);
};

const cleanShoppingCart = (req, res, next) => {
  const owner = req.cookies.sessionId;
  ShoppingCart.find({ owner })
    .then((products) => {
      if (!products.length) {
        throw new NotFoundError('Товаров в корзине нет');
      }
      if (products.length) {
        ShoppingCart.deleteMany({ owner })
          .then(() => res.status(200).send({ message: 'Корзина очищена' }))
          .catch(next);
      }
    })
    .catch(next);
};

module.exports = {
  getAllShoppingCartList,
  addProductToShoppingCart,
  handleAmountProductInShoppingCart,
  deleteProductFromShoppingCart,
  cleanShoppingCart,
};
