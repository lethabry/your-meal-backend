const ShoppingCart = require('../models/shoppingCart');

const getAllShoppingCartList = (req, res) => {
  ShoppingCart.find({})
    .then((shoppingCartList) => res.send({ shoppingCartList }))
    .catch(() => res.status(500).send({ message: 'На сервере произошла ошибка' }));
};

const addProductToShoppingCart = (req, res) => {
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
    .catch(() => res.status(401).send({ message: 'Переданны некоррекные данные при добавлении товара в корзину' }));
};

const handleAmountProductInShoppingCart = (req, res) => {
  const count = req.body.amount;
  ShoppingCart.findByIdAndUpdate(req.params.productId, { amount: count }, { new: true })
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: 'Такого товара в корзине нет' });
      }
      return res.send({ product });
    })
    .catch(() => res.status(500).send({ message: 'Возкникла ошибка на сервере' }));
};

const deleteProductFromShoppingCart = (req, res) => {
  ShoppingCart.findByIdAndRemove(req.params.productId)
    .then((product) => {
      if (!product) {
        return res.status(404).send({ message: 'Такого товара в корзине нет' });
      }
      return res.send({ message: 'Товар успешно удалён из корзины' });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервера' }));
};

module.exports = {
  getAllShoppingCartList,
  addProductToShoppingCart,
  handleAmountProductInShoppingCart,
  deleteProductFromShoppingCart,
};
