const express = require("express");
const router = express.Router();
const {ensureLoggedIn} = require("connect-ensure-login");

router.use(ensureLoggedIn("/"));

router.get("/", (req, res) => {
	res.render("me/index");
});

module.exports = router;
