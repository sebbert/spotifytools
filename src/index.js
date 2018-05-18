const dotenv = require("dotenv");
dotenv.config();

const app = require("./app");

const hostname = process.env.SPOTIFYTOOLS_HOSTNAME;
const port = process.env.SPOTIFYTOOLS_PORT;

app.listen(port, hostname, () => {
	console.log(`Listening on ${hostname}:${port}`)
});
