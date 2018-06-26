
const express = require("express");
const router = express.Router();
module.exports = router;
const {User, ManagedPlaylist} = require("../models");

const {spotifyApiForUser} = require("../core/createSpotifyWebApi");

router.use(require("../loggedIn"));

router.get("/user-playlists", async (req, res) => {
	const user = await User.findById(req.user.id).exec();
	const spotify = spotifyApiForUser(user);

	const playlistsResponse = await spotify.getUserPlaylists(user._id);
	const responseBody = playlistsResponse.body;
	const playlists = responseBody.items;
	const results = playlists.map(playlist => ({
		id: playlist.id,
		text: playlist.name,
	}));
	const result = { results };

	res.json(result);
})
