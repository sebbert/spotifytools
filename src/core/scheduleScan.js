const {scanAll} = require("./scan");

const intervalMs = 30 * 1000;

module.exports = function scheduleScan() {
	setInterval(() => scanAll(), intervalMs);
}
