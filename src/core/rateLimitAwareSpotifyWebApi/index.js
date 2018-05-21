// This entire thing is a huge hack, should fork the spotify-web-api-node library to support this, but oh well.

const SpotifyWebApi = require("spotify-web-api-node");
const retryIfRateLimited = require("./retryIfRateLimited");

require("./patchSpotifyWebApi");

class RateLimitAwareSpotifyWebApi extends SpotifyWebApi {}

for(let key in SpotifyWebApi.prototype) {
	const method = SpotifyWebApi.prototype[key];
	RateLimitAwareSpotifyWebApi.prototype[key] = function(...args) {

		return retryIfRateLimited(() => method.apply(this, args))
	}
}

module.exports = RateLimitAwareSpotifyWebApi;
