const SpotifyWebApiError = require("spotify-web-api-node/src/webapi-error");
const retryIfRateLimited = require("./retryIfRateLimited");

const timeout = (msec) => new Promise(resolve => setTimeout(resolve, msec));

class RateLimitError extends SpotifyWebApiError {
	constructor() {
		super("Exceeded rate limit", 429);
		this.headers = {
			"Retry-After": 0.01
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

it("can handle functions that do not return promises", async (done) => {
	expect(await retryIfRateLimited(() => "success")).toEqual("success");
	done();
});

it("handles functions that throw synchronously", async (done) => {
	const err = new Error("expected");
	const promise = retryIfRateLimited(() => { throw err });
	await expect(promise).rejects.toEqual(err);
	done();
});
