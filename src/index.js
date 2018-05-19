const dotenv = require("dotenv");
dotenv.config();

const connectDb = require("./connect-db");

connectDb().then(() => {
	const app = require("./app");

	const hostname = process.env.SPOTIFYTOOLS_HOSTNAME;
	const port = process.env.SPOTIFYTOOLS_PORT;
	
	app.listen(port, hostname, () => {
		console.log(`Listening on ${hostname}:${port}`)
	});
})
.catch(err => {
	console.error("UNHANDLED PROMISE REJECTION\n", err);
	process.exit(1);
});
