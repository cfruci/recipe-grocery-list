const express = require('express');
const morgan = require('morgan');

const app = express();

// routers
const homeRouter = require('./routes/homeRoutes');
const userRouter = require('./routes/userRoutes');
const recipeRouter = require('./routes/recipeRoutes');
const groceryRouter = require('./routes/groceryRoutes');

// middleware
app.use(express.json());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/', homeRouter);
app.use('/recipes', recipeRouter);
app.use('/users', userRouter);
app.use('/grocery-list', groceryRouter);

module.exports = app;
