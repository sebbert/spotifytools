const mongoose = require("mongoose");
const env = require("./env");

let promise = undefined;

module.exports = () => {
	if(promise)
		return promise;

	promise = mongoose.connect(env.require("SPOTIFYTOOLS_MONGODB_URI"));
	return promise;
}
