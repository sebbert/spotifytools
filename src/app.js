const express = require("express");
const app = express();
const routes = require("./routes");
const path = require("path");
const morgan = require("morgan");

app.set("views", "src/views");
app.set("view engine", "pug");

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"))

const staticPath = path.join(__dirname, "static");
app.use("/static", express.static(staticPath));

app.use(routes);

module.exports = app;
