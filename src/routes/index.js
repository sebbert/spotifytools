const auth = require("./auth");

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	app.end("");
});

router.use("/auth", auth);

module.exports = router;
