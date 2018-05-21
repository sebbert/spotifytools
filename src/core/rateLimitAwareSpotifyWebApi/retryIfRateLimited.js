
const SpotifyWebApiError = require("spotify-web-api-node/src/webapi-error");

class Task {
	constructor(func, resolve, reject) {
		Object.assign(this, {func, resolve, reject});
	}

	execute() {
		const {func, resolve, reject} = this;
		return Promise.resolve()
			.then(func)
			.then(resolve, reject);
	}
}

class TaskQueue {
	constructor() {
		this.queue = [];
	}

	enqueue(task) {
		return new Promise((resolve, reject) => {
			this.queue.push(new Task(task, resolve, reject));
		});
	}

	dequeue() {
		if(this.isEmpty)
			return;
		return this.queue.shift().execute();
	}

	flush() {
		if(this.isEmpty)
			return;
		let queue = this.queue;
		this.queue = [];
		return Promise.all( queue.map(x => x.execute()) );
	}

	get isEmpty() {
		return this.queue.length === 0;
	}
}

let rateLimitTimeout = null;
let rateLimitQueue = new TaskQueue();

function retryIfRateLimited(requestFactory, maxRetries = -1) {
	const retry = () =>
		rateLimitQueue.enqueue(
			() => retryIfRateLimited(requestFactory));

	if(rateLimitTimeout != null) {
		return retry();
	}

	return requestFactory()
	.catch((err) => {
		const isRateLimitError =
			err instanceof SpotifyWebApiError &&
			err.statusCode == 429;

		if (!isRateLimitError)
			throw err;

		if(rateLimitTimeout == null) {
			if(err.headers == null || err.headers["Retry-After"] == null) {
				throw new Error("No Retry-After header present");
			}

			const retryAfter = parseFloat(err.headers["Retry-After"]);
			if(typeof retryAfter !== "number" || isNaN(retryAfter)) {
				throw new Error(`Invalid value for Retry-After header: ${retryAfter}`);
			}

			const retryAfterMs = retryAfter * 1000;
			rateLimitTimeout = setTimeout(
				() => {
					rateLimitTimeout = null;
					rateLimitQueue.flush();
				},
				retryAfterMs
			);
		}

		return retry();
	})
}

module.exports = retryIfRateLimited;
