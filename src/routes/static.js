const express = require("express");
const router = express.Router();
const path = require("path");

const staticPath = path.resolve(__dirname, "..", "static");

function static(urlPath, filePath) {
	router.use(urlPath, express.static(filePath));
}

static("/normalize.css", require.resolve("normalize.css"));
static("/", path.resolve(__dirname, "..", "static"));

module.exports = router;
