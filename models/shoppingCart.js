const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const ShoppingCartSchema = new Schema(
  {
    owner: {
      type: String,
      require: true,
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 32,
    },
    image: {
      type: String,
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: 'Неправильный формат ссылки',
      },
    },
    price: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    is_in_shopping_cart: {
      type: Boolean,
      required: true,
      default: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 1,
    },
    structure: [{
      type: String,
      required: true,
    }],
  },
);

module.exports = mongoose.model('shoppingCart', ShoppingCartSchema);
