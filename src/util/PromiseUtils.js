exports.parallel = (promises) =>
	new Promise((resolve, reject) => {
		let results = new Array(promises.length);
		let errors = new Array(promises.length);
		let counter = 0;

		function step(value, target) {
			target[counter] = value;
			if(counter == promises.length) {
				resolve({ results, errors });
			}
		}

		promises.forEach(x => x.then(
			res => step(res, results),
			err => step(err, errors)
		))
	});
