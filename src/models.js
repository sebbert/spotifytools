const mg = require("mongoose");
const T = mg.Schema.Types;

const UserSchema = mg.Schema({
	spotifyId: T.String,
	spotifyToken: mg.Schema({
		accessToken: T.String,
		refreshToken: T.String,
		expiresIn: T.Date,
	})
});

const User = mg.model("User", UserSchema);

module.exports = {
	User,
	UserSchema,
};
