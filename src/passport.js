const env = require("./env");
const {Passport} = require("passport");
const {Strategy: SpotifyStrategy} = require("passport-spotify");
const {User} = require("./models");

const passport = new Passport();
module.exports = passport;

passport.serializeUser((user, callback) => {
	console.log("SERIALIZE USER", user);
	return callback(null, user)
});
passport.deserializeUser((user, callback) => {
	console.log("DESERIALIZE USER", user);
	return callback(null, user)
});

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
