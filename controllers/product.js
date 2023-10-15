const Product = require('../models/product');

const getAllProducts = (req, res) => {
  Product.find({})
    .then((product) => res.send({ product }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

const addProduct = (req, res) => {
  const {
    name,
    image,
    price,
    weight,
    structure,
  } = req.body;
  Product.create({
    name,
    image,
    price,
    weight,
    structure,
  }).then((product) => res.send({ product }))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка на сервере' }));
};

module.exports = { getAllProducts, addProduct };
