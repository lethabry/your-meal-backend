const Product = require('../models/product');

const getAllProducts = (req, res, next) => {
  Product.find({})
    .then((product) => res.send({ product }))
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

module.exports = { getAllProducts, addProduct };
