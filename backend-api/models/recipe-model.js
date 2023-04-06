const mongoose = require('mongoose');
const slugify = require('slugify');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A recipe must have a name'],
    unique: true,
    trim: true,
    minLength: [4, 'A recipe name must have more than 4 characters'],
    maxLength: [40, 'A recipe name must be shorter than 40 characters'],
  },
  slug: String,
  cuisine: {
    type: String,
    required: [true, ' A recipe must have a cuisine'],
    trim: true,
    minLength: [2, 'A cuisine name must have more than 2 characters'],
    maxLength: [40, 'A recipe name must be shorter than 40 characters'],
  },
  addedToGroceryList: { type: Boolean, default: false },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectID,
      ref: 'Ingredient',
      required: [true, 'A recipe must have ingredients'],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// DOCUMENT MIDDLEWARE
recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
