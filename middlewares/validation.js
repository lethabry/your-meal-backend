const { celebrate, Joi } = require('celebrate');

const urlRexEx = require('../utils/regex');

const addCategoryValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(32).required(),
  }),
});

const addProductValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(32).required(),
    image: Joi.string().regex(urlRexEx).required(),
    price: Joi.number().required(),
    weight: Joi.number().required(),
    structure: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
  }),
});

const getProductByIdValidation = celebrate({
  params: Joi.object().keys({
    productId: Joi.string().length(24).hex().required(),
  }),
});

const addProductToShoppingCartValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(32).required(),
    image: Joi.string().regex(urlRexEx).required(),
    price: Joi.number().required(),
    weight: Joi.number().required(),
    structure: Joi.array().items(Joi.string()).required(),
    category: Joi.string().required(),
  }),
  cookies: Joi.object().keys({
    sessionId: Joi.string().required(),
  }),
});

const handleAmountProductInShoppingCartValidation = celebrate({
  body: Joi.object().keys({
    amount: Joi.number().required(),
  }),
  cookies: Joi.object().keys({
    sessionId: Joi.string().required(),
  }),
});

const deleteProductFromShoppingCartValidation = celebrate({
  cookies: Joi.object().keys({
    sessionId: Joi.string().required(),
  }),
});

module.exports = {
  addCategoryValidation,
  addProductValidation,
  getProductByIdValidation,
  addProductToShoppingCartValidation,
  handleAmountProductInShoppingCartValidation,
  deleteProductFromShoppingCartValidation,
};
