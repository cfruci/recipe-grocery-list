const express = require("express");
const morgan = require("morgan");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");

const AppError = require("./src/utils/appError");
const globalErrorController = require("./src/controllers/error-controller");

const homeRouter = require("./src/routes/homeRoutes");
const recipeRouter = require("./src/routes/recipeRoutes");
const groceryRouter = require("./src/routes/groceryRoutes");
// const userRouter = require('./routes/userRoutes');

const app = express();

app.use(hpp()); // protection against parameter pollutions
app.use(compression()); // compresses response bodies
app.use(cors({ origin: "http://localhost:3002" }));
app.options("*", cors()); // enables CORS for client requests

app.use(xss()); // protection against cross-site scripting attacks
app.use(mongoSanitize()); // protection against NoSQL query injections

app.use(express.json()); // for pasring incoming json
app.use(express.urlencoded({ extended: true })); // for parsing form data

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/", homeRouter);
app.use("/recipes", recipeRouter);
app.use("/groceries", groceryRouter);
// app.use('/users', userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController.handleErrors);

module.exports = app;
