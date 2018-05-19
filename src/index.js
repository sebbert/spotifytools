const dotenv = require("dotenv");
dotenv.config();

const env = require("./env");

const connectDb = require("./connect-db");

connectDb().then(() => {
	const app = require("./app");

	const hostname = env.require("SPOTIFYTOOLS_HOSTNAME");
	const port = env.get("SPOTIFYTOOLS_PORT", 3000);
	
	app.listen(port, hostname, () => {
		console.log(`Listening on ${hostname}:${port}`)
	});
})
.catch(err => {
	console.error("UNHANDLED PROMISE REJECTION\n", err);
	process.exit(1);
});
