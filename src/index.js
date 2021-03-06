const dotenv = require("dotenv");
dotenv.config();
const env = require("./env");
const connectDb = require("./connect-db");
const scheduleScan = require("./core/scheduleScan");

connectDb()
.then(() => {
	scheduleScan();

	const app = require("./app");

	const hostname = env.require("SPOTIFYTOOLS_HOSTNAME");
	const port = env.get("SPOTIFYTOOLS_PORT", 3000);
	
	app.listen(port, hostname, () => {
		console.log(`Listening on ${hostname}:${port}`)
	});
})

process.on("unhandledRejection", (err) => {
	console.error("UNHANDLED PROMISE REJECTION:\n", err);
});
