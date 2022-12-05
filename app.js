// Core Modules
const express = require("express");
const app = express();

const allCountryRouter = require("./routers/allCountryRouter");
const countryInfoRouter = require("./routers/countryInfoRouter");

app.use(express.json());

app.use("/", allCountryRouter);
app.use("/info", countryInfoRouter);

module.exports = app;
