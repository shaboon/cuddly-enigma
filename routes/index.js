const express = require("express");

// Import our modular routers
const apiRouter = require("./api");

const app = express();

app.use("/api", apiRouter);

module.exports = app;
