const {ensureLoggedIn} = require("connect-ensure-login");
const renderWithContext = require("./renderWithContext");
const {compose} = require("compose-middleware");

module.exports = compose([
	ensureLoggedIn("/"),
	renderWithContext(req => ({ user: req.user })),
]);
