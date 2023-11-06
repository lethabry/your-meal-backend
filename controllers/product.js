const Product = require('../models/product');
const NotFoundError = require('../utils/errors/NotFoundError');

const getAllProducts = (req, res, next) => {
  Product.find({})
    .then((products) => res.send({ products }))
    .catch(next);
};

const addProduct = (req, res, next) => {
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
    .catch(next);
};

const getProductById = (req, res, next) => {
  Product.findById(req.params.productId)
    .then((product) => {
      if (product) {
        res.send(product);
      } else {
        throw new NotFoundError('Товар не найден');
      }
    })
    .catch(next);
};

module.exports = { getAllProducts, addProduct, getProductById };
