const express = require("express");
const router = express.Router();
const {User, ManagedPlaylist} = require("../models");
const {spotifyApiForUser} = require("../core/createSpotifyWebApi");

router.use(require("../loggedIn"));

router.get("/", async (req, res) => {
	const managedPlaylists = await ManagedPlaylist.find({ user: req.user.id }).exec();
	res.render("me/index", {
		managedPlaylists
	});
});

router.get("/managed-playlists/new", async (req, res) => {
	res.render("me/managed-playlists/new");
});

module.exports = router;
