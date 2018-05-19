const {Schema, model} = require("mongoose");
const T = Schema.Types;

const UserSchema = Schema({
	spotify: Schema({
		id: T.String,
		accessToken: T.String,
		refreshToken: T.String,
		expiresIn: T.Date,
	})
});

const User = model("User", UserSchema);

module.exports = {
	User,
	UserSchema,
};
