const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An ingredient must have a name'],
    unique: true,
  },
  type: { type: String, required: [true, 'An ingredient must have a type'] },
  quantity: {
    type: Number,
    required: [true, 'An ingredient must have a quantity'],
  },
  unit: { type: String },
});

const Ingredient = mongoose.model('Ingredient', ingredientsSchema);

module.exports = {
  Ingredient,
  ingredientsSchema,
};
