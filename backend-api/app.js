const express = require("express");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const RateLimit = require("express-rate-limit");

const AppError = require("./src/utils/appError");
const globalErrorController = require("./src/controllers/error-controller");

const homeRouter = require("./src/routes/homeRoutes");
const recipeRouter = require("./src/routes/recipeRoutes");
const groceryRouter = require("./src/routes/groceryRoutes");
// const userRouter = require('./routes/userRoutes');

const app = express();
dotenv.config({ path: "./config.env" });

app.use(express.static(path.join(__dirname, "../react-frontend/build")));
// app.use((req, res, next) => {
// 	res.sendFile(path.join(__dirname, "../react-frontend", "build", "index.html"));
// });

app.use(hpp()); // protection against parameter pollutions
app.use(compression()); // compresses response bodies
app.use(helmet()); // common vulnerability protection
app.use(cors()); // cors enabled for all origins
app.use(xss()); // protection against cross-site scripting attacks
app.use(mongoSanitize()); // protection against NoSQL query injections
const limiter = RateLimit({
	windowMs: 1 * 60 * 1000, // one minute
	max: 200,
});

app.use(limiter); // limits API requests
app.use(express.json()); // for pasring incoming json
app.use(express.urlencoded({ extended: true })); // for parsing form data

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

app.use("/api", homeRouter);
app.use("/api/recipes", recipeRouter);
app.use("/api/groceries", groceryRouter);
// app.use('/api/users', userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorController.handleErrors);

module.exports = app;
