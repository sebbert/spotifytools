const mongoose = require("mongoose");

let promise = undefined;

module.exports = () => {
	if(promise)
		return promise;

	promise = mongoose.connect(process.env.SPOTIFYTOOLS_MONGODB_URI);
	return promise;
}
