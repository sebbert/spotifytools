const {User, ManagedPlaylist} = require("../models");
const PromiseUtils = require("../util/PromiseUtils");
// const RateLimitAwareSpotifyApi = require("./RateLimitAwareSpotifyWebApi");


async function scan(managedPlaylist) {
	// if(managedPlaylist.lastSeenSnapshotId != )

}

async function scanAll() {
	const allPlaylists = await ManagedPlaylist.find();
	return PromiseUtils.parallel(allPlaylists.map(scan));
}

module.exports = {
	scan,
	scanAll
}
