const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const env = require("./env");
const session = require('express-session');
const passport = require("./passport");
const mongoose = require("mongoose");


app.set("views", "src/views");
app.set("view engine", "pug");

app.use(require('morgan')(env.get("NODE_ENV") === "production" ? "combined" : "dev"));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(session({
	secret: env.require("SPOTIFYTOOLS_SESSION_SECRET"),
	resave: true,
	saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

module.exports = app;
