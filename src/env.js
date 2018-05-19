const env = module.exports = {
	get(key, defaultValue) {
		let result = process.env[key];
		if(result === undefined)
			return defaultValue;
		return result;
	},
	require(key) {
		let value = env.get(key);
		if(value == undefined) {
			throw new Error(`Missing required environment variable '${key}'`)
		}
		return value;
	},
};
