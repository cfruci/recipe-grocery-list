const mongoose = require('mongoose');
const slugify = require('slugify'); // used to slugify the recipe name inputted by the user

// ingredient schema that gets embedded in the recipe schema below
const ingredientSchema = new mongoose.Schema({
  ingredientName: {
    type: String,
    required: [true, 'An ingredient must have a name'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'An ingredient must have a type'],
    enum: {
      values: ['pantry', 'dairy', 'produce', 'meat'],
    },
    trim: true,
    lowercase: true,
  },
  quantity: {
    type: Number,
    required: [true, 'An ingredient must have a quantity'],
    min: 0,
  },
  unit: {
    type: String,
    enum: {
      values: [
        'mL',
        'L',
        'tsp',
        'tbsp',
        'fl oz',
        'cup',
        'pint',
        'quart',
        'gallon',
        'mg',
        'g',
        'kg',
        'lb',
        'oz',
      ],
      message: 'You must provide a proper unit',
    },
    trim: true,
  },
});

// primary recipe schema used to validate new recipes
const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: [true, 'A recipe must have a name'],
    unique: true,
    trim: true,
  },
  slug: String,
  cuisine: {
    type: String,
    required: [true, 'A recipe must have a cuisine'],
    trim: true,
  },
  addedToGroceryList: { type: Boolean, default: false },
  ingredients: [ingredientSchema],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

// mongoose middleware to slugify the incoming recipe name
recipeSchema.pre('save', function (next) {
  this.slug = slugify(this.recipeName, {
    lower: true,
    strict: true,
    trim: true,
  });
  next();
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;
