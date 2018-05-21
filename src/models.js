const mg = require("mongoose");
const T = mg.Schema.Types;


const UserSchema = mg.Schema({
	spotifyId: T.String,
	spotifyProfile: T.Mixed,
	spotifyToken: mg.Schema({
		accessToken: T.String,
		refreshToken: T.String,
		expiresAt: T.Date,
	})
});

const User = mg.model("User", UserSchema);

const ManagedPlaylistSchema = mg.Schema({
	user: T.ObjectId,
	sourcePlaylistName: T.String,
	sourcePlaylistId: T.String,
	managedPlaylistName: T.String,
	managedPlaylistId: T.String,
	lastSnapshotId: T.String,
});

const ManagedPlaylist = mg.model("ManagedPlaylist", ManagedPlaylistSchema);

module.exports = {
	User,
	UserSchema,
	ManagedPlaylist,
	ManagedPlaylistSchema,
};
