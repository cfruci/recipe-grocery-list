// MODULE AND PACKAGE IMPORTS
const express = require('express');
const morgan = require('morgan');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
// const rateLimiter = require('express-rate-limiter');

// LOCAL IMPORTS
const AppError = require('./utils/appError');
const globalErrorController = require('./controllers/error-controller');

const app = express();

// ROUTERS
const homeRouter = require('./routes/homeRoutes');
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');
const groceryRouter = require('./routes/groceryRoutes');

// GLOBAL MIDDLEWARE
// PROTECTION AGAINST PARAMETER POLUTION
app.use(hpp());

// RATE LIMITER
// const limiter = rateLimiter({
//   max: 100,
//   windowMs: 60 * 60 * 1000,
//   message: 'Too many requests from the same IP',
// });

// app.use('/', limiter);

// PROTECTION AGAINST CROSS-SITE SCRIPTING ATTACKS
app.use(xss());
// protection against NoSQL query injections
app.use(mongoSanitize());

app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// MIDDLEWARE ROUTERS
app.use('/', homeRouter);
app.use('/recipes', recipeRouter);
app.use('/users', userRouter);
app.use('/grocery-list', groceryRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController.handleErrors);

module.exports = app;
