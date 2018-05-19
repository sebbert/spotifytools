const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");

app.set("views", "src/views");
app.set("view engine", "pug");

const staticPath = path.join(__dirname, "static");
app.use("/static", express.static(staticPath));

app.use(routes);

module.exports = app;
