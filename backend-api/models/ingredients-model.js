const mongoose = require('mongoose');

const ingredientsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'An ingredient must have a name'],
    unique: true,
    trim: true,
    minLength: [2, 'An ingredient name must have more than 2 characters'],
    maxLength: [40, 'An ingredient name must be shorter than 40 characters'],
  },
  type: {
    type: String,
    required: [true, 'An ingredient must have a type'],
    trim: true,
    enum: {
      values: ['pantry', 'dairy', 'produce', 'meat'],
      message: 'Your ingredient must be one of these four types',
    },
    minLength: [2, 'An ingredient type must have more than 2 characters'],
    maxLength: [40, 'An ingredient type must be shorter than 40 characters'],
  },
  quantity: {
    type: Number,
    required: [true, 'An ingredient must have a quantity'],
    min: [0, 'An ingredient quantity must be greater than 0'],
    max: [100, 'An ingredient quantity must be less than 100'],
  },
  unit: {
    type: String,
    trim: true,
    maxLength: [40, 'An ingredient unit must be less than 40 characters'],
    enum: {
      values: [
        'unit',
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
      message: 'You must select a unit',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
});

exports.Ingredient = mongoose.model('Ingredient', ingredientsSchema);
