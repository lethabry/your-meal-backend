const Category = require('../models/category');

const getAllCategories = (req, res, next) => {
  Category.find({})
    .then((categories) => res.send(categories))
    .catch(next);
};

const addCategory = (req, res, next) => {
  const { name } = req.body;
  Category.create({ name })
    .then((category) => res.send(category))
    .catch(next);
};

module.exports = { getAllCategories, addCategory };
