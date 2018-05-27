const env = require("../env");

require("./RateLimitAwareSpotifyWebApi/patchSpotifyWebApi");
// const RateLimitAwareSpotifyWebApi = require("./RateLimitAwareSpotifyWebApi");

const SpotifyWebApi = require("spotify-web-api-node");


function createSpotifyApi(credentials) {
	return new SpotifyWebApi({
		clientId: env.require("SPOTIFY_CLIENT_ID"),
		clientSecret: env.require("SPOTIFY_CLIENT_SECRET"),
		redirectUri: env.require("SPOTIFY_REDIRECT_URI"),
		...credentials
	});
}

function spotifyApiForUser(user) {
	const {accessToken, refreshToken} = user.spotifyToken;
	const spotify = createSpotifyApi();
	spotify.setAccessToken(accessToken);
	spotify.setRefreshToken(refreshToken);
	return spotify;
}

module.exports = {
	createSpotifyApi,
	spotifyApiForUser
};
