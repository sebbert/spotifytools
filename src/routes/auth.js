const express = require("express");
const router = express.Router();
const passport = require("../passport");

router.get("/spotify",
	passport.authenticate("spotify", {
		scope: [
			"playlist-modify-public",
			"playlist-modify-private",
			"user-library-read",
			"user-read-private",
			"user-read-recently-played",
			"user-top-read",
		]
	})
);

router.get("/spotify-callback",
	passport.authenticate("spotify", { failureRedirect: "/" }),
	(req, res) => res.redirect("/me")
);

router.get("/logout", (req, res) => {
	req.logout();
	req.session.destroy();
	res.redirect("/");
});

module.exports = router;
