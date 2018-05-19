const env = require("./env");
const {Passport} = require("passport");
const {Strategy: SpotifyStrategy} = require("passport-spotify");
const {User} = require("./models");

const passport = new Passport();
module.exports = passport;

passport.serializeUser((user, callback) => {
	return callback(undefined, user._id);
});
passport.deserializeUser((userId, callback) => {
	User.findOne({ _id: userId }, callback);
});

const spotifyStrategy = new SpotifyStrategy(
	{
		clientID: env.require("SPOTIFY_CLIENT_ID"),
		clientSecret: env.require("SPOTIFY_CLIENT_SECRET"),
		callbackURL: env.require("SPOTIFY_REDIRECT_URI"),
	},
	async (accessToken, refreshToken, expiresIn, spotifyProfile, done) => {
		const expiresAt = new Date();
		expiresAt.setSeconds(expiresAt.getSeconds() + expiresIn);
		const spotifyToken = {
			accessToken,
			refreshToken,
			expiresAt
		};
		try {
			let user = await User.findOne({ spotifyId: spotifyProfile.id });
			if(user) {
				await user.update({ spotifyToken, spotifyProfile });
			}
			else {
				user = await User.create({
					spotifyId: spotifyProfile.id,
					spotifyProfile,
					spotifyToken,
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
