const User = require('../models/users-model');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  const token = signToken(newUser._id);
  if (!newUser) {
    return next(new AppError('New user could not be created', 400));
  }
  res.status(200).json({
    status: 'Success',
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid credentials', 400));
  }

  const token = signToken(user.id);
  res
    .status(200)
    .json({ status: 'Success', token, message: 'You successfully signed in' });
});

exports.protect = catchAsync(async (req, res, next) => {
  const { token } = req;
  const user = User.findById({ id });
  if (user.token) res.send(200);
});
