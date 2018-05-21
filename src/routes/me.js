const express = require("express");
const router = express.Router();

router.use(require("../loggedIn"));

router.get("/", (req, res) => {
	res.render("me/index");
});

module.exports = router;
