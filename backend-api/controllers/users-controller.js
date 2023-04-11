const User = require('../models/users-model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json({
    status: 'Success',
    data: {
      users,
    },
  });
  // next(new AppError('Could not get all users', 400));
});

exports.createUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);
  res.status(200).json({
    status: 'Success',
    data: {
      newUser,
    },
  });
  // next(new AppError('Could not get all users', 400));
});

exports.showUserDetail = catchAsync(async (req, res, next) => {
  const user = await User.find(req.params.id);
  res.status(200).json({
    status: 'Success',
    data: {
      user,
    },
  });
  // next(new AppError(`Could not find user with id ${req.params.id}`, 400));
});

exports.updateUser = catchAsync(async (req, res, next) => {
  res
    .status(404)
    .json({ status: 'fail', message: 'this route is not yet defined' });
});

exports.deleteUser = catchAsync(async (req, res, next) => {
  res
    .status(404)
    .json({ status: 'fail', message: 'this route is not yet defined' });
});

exports.deleteAllUsers = catchAsync(async (req, res, next) => {
  await User.deleteMany();
  res.status(200).json({
    status: 'Success',
    message: 'All users were deleted from the database',
  });
  // next(new AppError('All users were not deleted correctly', 400));
});
