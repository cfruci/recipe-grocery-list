const mongoose = require('mongoose');
const { ingredientSchema } = require('./ingredients-models');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A recipe must have a name'],
    unique: true,
  },
  cuisine: {
    type: String,
    required: [true, ' A recipe must have a cuisine'],
  },
  addedToGroceryList: { type: Boolean, default: false },
  ingredients: {
    type: [ingredientSchema],
    required: [true, 'A recipe must have ingredients'],
  },
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
