// This entire thing is a huge hack, should fork the spotify-web-api-node library to support this, but oh well.

const WebApiRequest = require("spotify-web-api-node/src/webapi-request");
const BaseRequest = require("spotify-web-api-node/src/base-request");

require("./patchSpotifyWebApi");
