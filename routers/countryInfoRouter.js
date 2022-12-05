const express = require("express");
const countryInfoHandler = require("../controllers/countryInfoHandler");

const router = express.Router();
router.route("/:name").get(countryInfoHandler.getCountryInfo);

module.exports = router;
