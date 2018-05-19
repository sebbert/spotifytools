const express = require("express");
const router = express.Router();
const passport = require("passport");
const {Strategy: SpotifyStrategy} = require("passport-spotify");
const env = require("../env");

const {User} = require("../models");

const spotifyStrategy = new SpotifyStrategy(
	{
		clientID: env.require("SPOTIFY_CLIENT_ID"),
		clientSecret: env.require("SPOTIFY_CLIENT_SECRET"),
		callbackURL: env.require("SPOTIFY_REDIRECT_URI"),
	},
	async (accessToken, refreshToken, expiresIn, profile, done) => {
		const expiresAt = new Date();
		expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
		const spotifyToken = {
			accessToken,
			refreshToken,
			expiresAt
		};
		try {
			let user = await User.findOne({ spotifyId: profile.id });
			if(user) {
				await user.update({ spotifyToken });
			}
			else {
				user = await User.create({
					spotifyId: profile.id,
					spotifyToken
				});
			}

			done(undefined, user);
		}
		catch(err) {
			done(err, undefined);
		}
	}
);

passport.use(spotifyStrategy);

router.get("/spotify",
	passport.authenticate("spotify", {
		scope: [
			"playlist-modify-public",
			"playlist-modify-private",
			"user-library-read",
			"user-read-private",
			"user-read-recently-played",
			"user-top-read",
		]
	})
);

router.get("/spotify-callback",
	passport.authenticate("spotify", { failureRedirect: "/" }),
	(req, res) => res.redirect("/me")
);

module.exports = router;
