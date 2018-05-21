const SpotifyWebApiError = require("spotify-web-api-node/src/webapi-error");
const retryIfRateLimited = require("./retryIfRateLimited");

const timeout = (msec) => new Promise(resolve => setTimeout(resolve, msec));

class RateLimitError extends SpotifyWebApiError {
	constructor() {
		super("Exceeded rate limit", 429);
		this.headers = {
			"Retry-After": 0.1
		}
	}
}

it("does the thing", async (done) => {
	let shouldFail = true;
	let isResolved = false;

	async function requestFactory() {
		if(shouldFail) {
			shouldFail = false;
			throw new RateLimitError();
		}

		isResolved = true;
		return "success";
	}

	expect(await retryIfRateLimited(requestFactory)).toEqual("success");

	done();
})
