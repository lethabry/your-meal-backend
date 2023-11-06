const mongoose = require('mongoose');

const { Schema } = mongoose;

const CategorySchema = new Schema({
  name: {
    type: String,
    require: true,
    minLength: 2,
    maxLength: 32,
  },
});

module.exports = mongoose.model('category', CategorySchema);
