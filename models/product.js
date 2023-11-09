const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
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
    structure: [{
      type: String,
      required: true,
    }],
    category: {
      type: String,
      required: true,
    },
    is_in_shopping_cart: {
      type: Boolean,
      default: false,
    },
    description: {
      type: String,
      required: true,
    },
  },
);

module.exports = mongoose.model('product', ProductSchema);
