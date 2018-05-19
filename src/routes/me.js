const express = require("express");
const router = express.Router();
const {ensureLoggedIn} = require("connect-ensure-login");
const renderWithContext = require("../renderWithContext");

router.use(ensureLoggedIn("/"));

router.use(
	renderWithContext((req, res) => {
		return {
			user: req.user
		}
	})
)

router.get("/", (req, res) => {
	res.render("me/index");
});

module.exports = router;
