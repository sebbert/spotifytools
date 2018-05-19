const express = require("express");
const router = module.exports = express.Router();
const passport = require("passport");
const {Strategy: SpotifyStrategy} = require("passport-spotify");

const {User} = require("../models");

const spotifyStrategy = new SpotifyStrategy(
	{
		clientID: process.env.SPOTIFY_CLIENT_ID,
		clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
		callbackURL: process.env.SPOTIFY_REDIRECT_URI,
	},
	(accessToken, refreshToken, expiresIn, profile, doneCallback) => {
		
	}
);

passport.use(spotifyStrategy);

router.get("/spotify",
	passport.authenticate
);

router.get("/spotify-callback", (req, res) => {
	
});
