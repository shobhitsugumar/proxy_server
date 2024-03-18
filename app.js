const express = require("express");
const app = express();
const proxyRouter = require("./proxyRouter");

app.use("/api/user", proxyRouter);

module.exports = app;
