const express = require("express");
const router = express.Router();

const {ensureLoggedOut} = require("connect-ensure-login");

router.get("/",
	ensureLoggedOut("/me"),
	(req, res) => {
		res.render("index")
	}
);

router.use("/static", require("./static"));
router.use("/auth", require("./auth"));
router.use("/me", require("./me"));
router.use("/select2", require("./select2"));

module.exports = router;
