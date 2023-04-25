const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// non-Express error handling
process.on("uncaughtException", (err) => {
	console.log("UNCAUGHT EXCEPTION. Shutting down server...");
	console.log(err.name, err.message);
	process.exit(1);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION. Shutting down server...");
	console.log(err.name, err.message);
	server.close(() => {
		process.exit(1);
	});
});

const DB = process.env.DATABASE.replace("<PASSWORD>", process.env.DATABASE_PASSWORD);

mongoose.connect(DB).then(() => console.log("Connection successful"));

const port = process.env.PORT || 3000;
const server = app.listen(port, (req, res) => {
	console.log(`Listening on port ${port}`);
});

module.exports = {
	server,
	app,
};
