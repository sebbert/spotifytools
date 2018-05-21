const express = require("express");
const router = express.Router();
const path = require("path");

const staticPath = path.resolve(__dirname, "..", "static");

function static(urlPath, filePath, options=undefined) {
	router.use(urlPath, express.static(filePath, options));
}

static("/normalize.css", require.resolve("normalize.css"));
const bootstrapPackageDirPath = path.dirname(require.resolve("bootstrap/package.json"));
static("/bootstrap", path.join(bootstrapPackageDirPath, "dist"));
static("/jquery.js", require.resolve("jquery/dist/jquery.js"));
static("/", path.resolve(__dirname, "..", "static"));

module.exports = router;
