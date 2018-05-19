const auth = require("./auth");
const me = require("./me");

const express = require("express");
const router = express.Router();

const {ensureLoggedOut} = require("connect-ensure-login");

router.get("/",
	ensureLoggedOut("/me"),
	(req, res) => {
		res.render("index")
	}
);

router.use("/auth", auth);
router.use("/me", me);

module.exports = router;
