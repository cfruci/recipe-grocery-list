const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // for encrypting passwords
const validator = require('validator'); // npm library of string validators

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'A username is required'],
    trim: true,
    minLength: [4, 'Your username must be longer than 4 characters'],
    maxLength: [10, 'Your username must be shorter than 10 characters'],
  },
  email: {
    type: String,
    required: [true, 'You must provide an email address'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address'],
  },
  password: {
    type: String,
    required: true,
    minLength: [8, 'Your password must be at least 8 characters long'],
    select: false,
    validate: [validator.isStrongPassword, 'Please enter a stronger password'],
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (userInput) {
        return userInput === this.password;
      },
      message: 'Please try again. The passwords are not the same',
    },
  },
});

// checks to see if the password field has changed before saving a user document
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  } else {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
  }
});

// adds static function to user schema that compares inputted password with salted password
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
