const express = require("express");
const router = express.Router();
const path = require("path");

const staticPath = path.resolve(__dirname, "..", "static");

function static(urlPath, filePath, options=undefined) {
	router.use(urlPath, express.static(filePath, options));
}

function findPackageDir(package) {
	const packageJsonPath = require.resolve(path.join(package, "package.json"));
	return path.dirname(packageJsonPath);
}

function relativeToPackage(package, ...rest) {
	return path.join(findPackageDir(package), ...rest);
}

static("/bootstrap", relativeToPackage("bootstrap", "dist"));
static("/select2", relativeToPackage("select2", "dist"));
static("/jquery.js", require.resolve("jquery/dist/jquery.js"));
static("/", path.resolve(__dirname, "..", "static"));

module.exports = router;
