const mg = require("mongoose");
const T = mg.Schema.Types;

const UserSchema = mg.Schema({
	spotifyId: T.String,
	spotifyToken: mg.Schema({
		accessToken: T.String,
		refreshToken: T.String,
		expiresAt: T.Date,
	})
});

const User = mg.model("User", UserSchema);

module.exports = {
	User,
	UserSchema,
};
